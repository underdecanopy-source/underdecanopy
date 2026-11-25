import { createHash } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@/lib/generated/prisma';
import { z } from 'zod';
import { requireBusinessAccess } from '@/lib/olowo/businessAccess';
import db from '@/lib/prisma';

const paymentSchema = z.object({
    amount: z.number().finite().positive().max(9_999_999_999.99)
        .refine((value) => Number(value.toFixed(2)) === value, 'Amounts may have up to 2 decimal places'),
    method: z.enum(['CASH', 'BANK_TRANSFER', 'POS', 'OTHER']),
    idempotencyKey: z.string().uuid(),
});

type RouteContext = { params: { businessId: string; saleId: string } };
type PaymentInput = z.infer<typeof paymentSchema>;

export async function POST(request: NextRequest, { params }: RouteContext) {
    let input: PaymentInput | undefined;
    try {
        const access = await requireBusinessAccess(params.businessId, 'sales:write');
        if (!access.ok) return access.response;

        let body: unknown;
        try {
            body = await request.json();
        } catch {
            return NextResponse.json({ error: 'Request body must be valid JSON' }, { status: 400 });
        }

        const parsed = paymentSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({ error: 'Validation failed', details: parsed.error.issues }, { status: 400 });
        }
        input = parsed.data;
        const fingerprint = createHash('sha256').update(JSON.stringify({
            saleId: params.saleId,
            amount: input.amount,
            method: input.method,
        })).digest('hex');

        const result = await db.$transaction(async (tx) => {
            const previous = await tx.payment.findUnique({
                where: {
                    businessId_idempotencyKey: {
                        businessId: params.businessId,
                        idempotencyKey: input!.idempotencyKey,
                    },
                },
                select: {
                    id: true,
                    saleId: true,
                    amount: true,
                    method: true,
                    receivedAt: true,
                    requestFingerprint: true,
                },
            });
            if (previous) {
                if (previous.saleId !== params.saleId || previous.requestFingerprint !== fingerprint) {
                    throw new PaymentConflictError();
                }
                const sale = await tx.sale.findFirst({
                    where: { id: params.saleId, businessId: params.businessId },
                    select: { paymentStatus: true },
                });
                return { payment: previous, salePaymentStatus: sale?.paymentStatus ?? 'UNPAID', replayed: true };
            }

            const sale = await tx.sale.findFirst({
                where: { id: params.saleId, businessId: params.businessId, status: 'COMPLETED' },
                select: {
                    id: true,
                    reference: true,
                    totalAmount: true,
                    payments: { select: { amount: true } },
                },
            });
            if (!sale) throw new MissingSaleError();

            const existingPayments = sale.payments.reduce(
                (total, payment) => total.plus(payment.amount),
                new Prisma.Decimal(0),
            );
            const amount = new Prisma.Decimal(String(input!.amount));
            const paidAfter = existingPayments.plus(amount);
            if (paidAfter.greaterThan(sale.totalAmount)) {
                throw new InvalidPaymentError('Payment would exceed the sale total');
            }

            const paymentStatus = paidAfter.equals(sale.totalAmount)
                ? 'PAID'
                : paidAfter.greaterThan(0)
                    ? 'PARTIALLY_PAID'
                    : 'UNPAID';

            const payment = await tx.payment.create({
                data: {
                    businessId: params.businessId,
                    saleId: sale.id,
                    amount,
                    method: input!.method,
                    idempotencyKey: input!.idempotencyKey,
                    requestFingerprint: fingerprint,
                    actorAuthUserId: access.user.id,
                },
                select: {
                    id: true,
                    saleId: true,
                    amount: true,
                    method: true,
                    receivedAt: true,
                    requestFingerprint: true,
                },
            });

            await tx.sale.update({
                where: { businessId_id: { businessId: params.businessId, id: sale.id } },
                data: { paymentStatus },
            });

            const accounts = await tx.account.findMany({
                where: { businessId: params.businessId, code: { in: ['1000', '1100'] } },
                select: { id: true, code: true },
            });
            const accountId = Object.fromEntries(accounts.map((account) => [account.code, account.id]));
            if (!accountId['1000'] || !accountId['1100']) throw new MissingAccountError();

            await tx.journalEntry.create({
                data: {
                    businessId: params.businessId,
                    sourceType: 'SALE_PAYMENT',
                    sourceId: payment.id,
                    memo: `Payment for sale ${sale.reference}`,
                    actorAuthUserId: access.user.id,
                    lines: {
                        create: [
                            { accountId: accountId['1000'], debit: amount, credit: new Prisma.Decimal(0) },
                            { accountId: accountId['1100'], debit: new Prisma.Decimal(0), credit: amount },
                        ],
                    },
                },
            });
            await tx.auditLog.create({
                data: {
                    businessId: params.businessId,
                    actorAuthUserId: access.user.id,
                    action: 'SALE_PAYMENT_RECORDED',
                    entity: 'Payment',
                    entityId: payment.id,
                    metadata: {
                        saleId: sale.id,
                        saleReference: sale.reference,
                        amount: amount.toString(),
                        method: input!.method,
                        paymentStatus,
                    },
                },
            });
            await tx.businessEvent.create({
                data: {
                    businessId: params.businessId,
                    eventType: 'SALE_PAYMENT_RECORDED',
                    entityType: 'Payment',
                    entityId: payment.id,
                    actorAuthUserId: access.user.id,
                    data: {
                        saleId: sale.id,
                        amount: amount.toString(),
                        method: input!.method,
                        paymentStatus,
                    },
                },
            });

            return { payment, salePaymentStatus: paymentStatus, replayed: false };
        }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });

        const { requestFingerprint: _requestFingerprint, ...publicPayment } = result.payment;
        return NextResponse.json({
            payment: publicPayment,
            paymentStatus: result.salePaymentStatus,
            replayed: result.replayed,
        }, { status: result.replayed ? 200 : 201 });
    } catch (error) {
        if (error instanceof PaymentConflictError) {
            return NextResponse.json({ error: 'Idempotency key was already used for a different payment' }, { status: 409 });
        }
        if (error instanceof MissingSaleError) {
            return NextResponse.json({ error: 'Completed sale not found' }, { status: 404 });
        }
        if (error instanceof InvalidPaymentError) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        if (error instanceof MissingAccountError) {
            return NextResponse.json({ error: 'Required cash or receivable accounts are missing' }, { status: 409 });
        }
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2034') {
            return NextResponse.json({ error: 'Sale changed concurrently. Refresh and retry.' }, { status: 409 });
        }
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002' && input) {
            return NextResponse.json({ error: 'Idempotency key was already used' }, { status: 409 });
        }
        console.error('Record Olowo sale payment failed:', error);
        return NextResponse.json({ error: 'Failed to record payment' }, { status: 500 });
    }
}

class PaymentConflictError extends Error {}
class MissingSaleError extends Error {}
class InvalidPaymentError extends Error {}
class MissingAccountError extends Error {}
