import { createHash, randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@/lib/generated/prisma';
import { z } from 'zod';
import { requireBusinessAccess } from '@/lib/olowo/businessAccess';
import db from '@/lib/prisma';

const money = z.number().finite().min(0).max(9_999_999_999.99)
    .refine((value) => Number(value.toFixed(2)) === value, 'Amounts may have up to 2 decimal places');
const quantity = z.number().finite().positive().max(999_999_999)
    .refine((value) => Number(value.toFixed(3)) === value, 'Quantity may have up to 3 decimal places');

const saleSchema = z.object({
    warehouseId: z.string().trim().min(1).max(64),
    customerId: z.string().trim().min(1).max(64).optional(),
    items: z.array(z.object({
        productId: z.string().trim().min(1).max(64),
        quantity,
    })).min(1).max(100).superRefine((items, ctx) => {
        const ids = new Set<string>();
        items.forEach((item, index) => {
            if (ids.has(item.productId)) {
                ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'A product may appear only once in a sale', path: [index, 'productId'] });
            }
            ids.add(item.productId);
        });
    }),
    discountAmount: money.default(0),
    paymentAmount: money.default(0),
    paymentMethod: z.enum(['CASH', 'BANK_TRANSFER', 'POS', 'OTHER']).default('CASH'),
    idempotencyKey: z.string().uuid(),
});

type RouteContext = { params: { businessId: string } };
type SaleInput = z.infer<typeof saleSchema>;

const systemAccounts = [
    { code: '1000', name: 'Cash on hand', type: 'ASSET' as const },
    { code: '1100', name: 'Accounts receivable', type: 'ASSET' as const },
    { code: '1200', name: 'Inventory', type: 'ASSET' as const },
    { code: '4000', name: 'Sales revenue', type: 'REVENUE' as const },
    { code: '5000', name: 'Cost of goods sold', type: 'EXPENSE' as const },
] as const;

export async function GET(_request: NextRequest, { params }: RouteContext) {
    try {
        const access = await requireBusinessAccess(params.businessId);
        if (!access.ok) return access.response;

        const sales = await db.sale.findMany({
            where: { businessId: params.businessId },
            select: {
                id: true,
                reference: true,
                status: true,
                paymentStatus: true,
                subtotal: true,
                discountAmount: true,
                taxAmount: true,
                totalAmount: true,
                occurredAt: true,
                customer: { select: { id: true, name: true } },
                warehouse: { select: { id: true, name: true } },
                items: { select: { id: true, description: true, quantity: true, unitPrice: true, lineTotal: true } },
                payments: { select: { id: true, amount: true, method: true, receivedAt: true } },
            },
            orderBy: { occurredAt: 'desc' },
            take: 100,
        });
        return NextResponse.json(sales);
    } catch (error) {
        console.error('List Olowo sales failed:', error);
        return NextResponse.json({ error: 'Failed to load sales' }, { status: 500 });
    }
}

export async function POST(request: NextRequest, { params }: RouteContext) {
    let input: SaleInput | undefined;
    try {
        const access = await requireBusinessAccess(params.businessId, 'sales:write');
        if (!access.ok) return access.response;

        let body: unknown;
        try {
            body = await request.json();
        } catch {
            return NextResponse.json({ error: 'Request body must be valid JSON' }, { status: 400 });
        }

        const parsed = saleSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({ error: 'Validation failed', details: parsed.error.issues }, { status: 400 });
        }
        input = parsed.data;
        const fingerprint = fingerprintFor(input);

        const result = await db.$transaction(async (tx) => {
            const previous = await tx.sale.findUnique({
                where: { businessId_idempotencyKey: { businessId: params.businessId, idempotencyKey: input!.idempotencyKey } },
                select: saleResponseSelect,
            });
            if (previous) {
                if (previous.requestFingerprint !== fingerprint) throw new IdempotencyConflictError();
                return { sale: previous, replayed: true };
            }

            const warehouse = await tx.warehouse.findFirst({
                where: { id: input!.warehouseId, businessId: params.businessId, isActive: true },
                select: { id: true },
            });
            if (!warehouse) throw new MissingRecordError('Active warehouse not found');

            if (input!.customerId) {
                const customer = await tx.customer.findFirst({
                    where: { id: input!.customerId, businessId: params.businessId },
                    select: { id: true },
                });
                if (!customer) throw new MissingRecordError('Customer not found');
            }

            const products = await Promise.all(input!.items.map(async (item) => {
                const product = await tx.product.findFirst({
                    where: { id: item.productId, businessId: params.businessId, isActive: true },
                    select: { id: true, name: true, sellingPrice: true, costPrice: true, trackInventory: true },
                });
                if (!product) throw new MissingRecordError('Active product not found');
                return { ...product, quantity: new Prisma.Decimal(String(item.quantity)) };
            }));

            for (const product of products) {
                if (!product.trackInventory) continue;
                const stock = await tx.stockMovement.aggregate({
                    where: { businessId: params.businessId, productId: product.id, warehouseId: input!.warehouseId },
                    _sum: { quantity: true },
                });
                const available = stock._sum.quantity ?? new Prisma.Decimal(0);
                if (available.lessThan(product.quantity)) throw new InsufficientStockError();
            }

            const subtotal = products.reduce(
                (total, product) => total.plus(product.sellingPrice.mul(product.quantity)),
                new Prisma.Decimal(0),
            );
            const discountAmount = new Prisma.Decimal(String(input!.discountAmount));
            if (discountAmount.greaterThan(subtotal)) throw new InvalidSaleError('Discount cannot exceed the sale subtotal');
            const totalAmount = subtotal.minus(discountAmount);
            const paymentAmount = new Prisma.Decimal(String(input!.paymentAmount));
            if (paymentAmount.greaterThan(totalAmount)) throw new InvalidSaleError('Payment cannot exceed the sale total');
            if (paymentAmount.lessThan(totalAmount) && !input!.customerId) {
                throw new InvalidSaleError('A customer is required for an unpaid or partially paid sale');
            }

            const paymentStatus = paymentAmount.equals(0)
                ? 'UNPAID'
                : paymentAmount.equals(totalAmount)
                    ? 'PAID'
                    : 'PARTIALLY_PAID';
            const reference = `OLW-SALE-${randomUUID().replace(/-/g, '').slice(0, 16).toUpperCase()}`;
            const sale = await tx.sale.create({
                data: {
                    businessId: params.businessId,
                    customerId: input!.customerId || null,
                    warehouseId: input!.warehouseId,
                    reference,
                    paymentStatus,
                    subtotal,
                    discountAmount,
                    totalAmount,
                    idempotencyKey: input!.idempotencyKey,
                    requestFingerprint: fingerprint,
                    actorAuthUserId: access.user.id,
                    items: {
                        create: products.map((product) => ({
                            businessId: params.businessId,
                            productId: product.id,
                            description: product.name,
                            quantity: product.quantity,
                            unitPrice: product.sellingPrice,
                            unitCost: product.costPrice,
                            lineTotal: product.sellingPrice.mul(product.quantity),
                        })),
                    },
                    payments: paymentAmount.greaterThan(0) ? {
                        create: {
                            amount: paymentAmount,
                            method: input!.paymentMethod,
                            actorAuthUserId: access.user.id,
                        },
                    } : undefined,
                },
                select: saleResponseSelect,
            });

            const inventoryProducts = products.filter((product) => product.trackInventory);
            const cogs = inventoryProducts.reduce(
                (total, product) => total.plus(product.costPrice.mul(product.quantity)),
                new Prisma.Decimal(0),
            );
            await Promise.all(inventoryProducts.map((product) => tx.stockMovement.create({
                data: {
                    businessId: params.businessId,
                    productId: product.id,
                    warehouseId: input!.warehouseId,
                    type: 'SALE',
                    quantity: product.quantity.negated(),
                    unitCost: product.costPrice,
                    reason: `Completed sale ${reference}`,
                    actorAuthUserId: access.user.id,
                },
            })));

            const accounts = await Promise.all(systemAccounts.map((account) => tx.account.upsert({
                where: { businessId_code: { businessId: params.businessId, code: account.code } },
                create: { businessId: params.businessId, ...account, isSystem: true },
                update: {},
                select: { id: true, code: true },
            })));
            const accountId = Object.fromEntries(accounts.map((account) => [account.code, account.id]));
            const receivable = totalAmount.minus(paymentAmount);
            const lines = [
                ...(paymentAmount.greaterThan(0) ? [{ accountId: accountId['1000'], debit: paymentAmount, credit: new Prisma.Decimal(0) }] : []),
                ...(receivable.greaterThan(0) ? [{ accountId: accountId['1100'], debit: receivable, credit: new Prisma.Decimal(0) }] : []),
                { accountId: accountId['4000'], debit: new Prisma.Decimal(0), credit: totalAmount },
                ...(cogs.greaterThan(0) ? [
                    { accountId: accountId['5000'], debit: cogs, credit: new Prisma.Decimal(0) },
                    { accountId: accountId['1200'], debit: new Prisma.Decimal(0), credit: cogs },
                ] : []),
            ];
            await tx.journalEntry.create({
                data: {
                    businessId: params.businessId,
                    sourceType: 'SALE',
                    sourceId: sale.id,
                    memo: `Completed sale ${reference}`,
                    actorAuthUserId: access.user.id,
                    lines: { create: lines.map((line) => ({ businessId: params.businessId, ...line })) },
                },
            });
            await tx.auditLog.create({
                data: {
                    businessId: params.businessId,
                    actorAuthUserId: access.user.id,
                    action: 'SALE_COMPLETED',
                    entity: 'Sale',
                    entityId: sale.id,
                    metadata: { reference, totalAmount: totalAmount.toString(), paymentStatus },
                },
            });
            await tx.businessEvent.create({
                data: {
                    businessId: params.businessId,
                    eventType: 'SALE_COMPLETED',
                    entityType: 'Sale',
                    entityId: sale.id,
                    actorAuthUserId: access.user.id,
                    data: { reference, totalAmount: totalAmount.toString(), paymentStatus },
                },
            });
            return { sale, replayed: false };
        }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });

        return NextResponse.json({ sale: publicSale(result.sale), replayed: result.replayed }, { status: result.replayed ? 200 : 201 });
    } catch (error) {
        if (error instanceof IdempotencyConflictError) {
            return NextResponse.json({ error: 'Idempotency key was already used for a different sale' }, { status: 409 });
        }
        if (error instanceof MissingRecordError || error instanceof InvalidSaleError) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        if (error instanceof InsufficientStockError) {
            return NextResponse.json({ error: 'Sale would make stock negative' }, { status: 409 });
        }
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2034') {
            return NextResponse.json({ error: 'Stock changed concurrently. Refresh and retry the sale.' }, { status: 409 });
        }
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002' && input) {
            const replay = await confirmedReplay(params.businessId, input.idempotencyKey, fingerprintFor(input));
            if (replay) return NextResponse.json({ sale: publicSale(replay), replayed: true });
            return NextResponse.json({ error: 'Idempotency key was already used for a different sale' }, { status: 409 });
        }
        console.error('Create Olowo sale failed:', error);
        return NextResponse.json({ error: 'Failed to record sale' }, { status: 500 });
    }
}

const saleResponseSelect = {
    id: true,
    reference: true,
    requestFingerprint: true,
    paymentStatus: true,
    totalAmount: true,
    occurredAt: true,
    items: { select: { id: true, description: true, quantity: true, unitPrice: true, lineTotal: true } },
    payments: { select: { id: true, amount: true, method: true, receivedAt: true } },
} as const;

function fingerprintFor(input: SaleInput) {
    const normalized = {
        warehouseId: input.warehouseId,
        customerId: input.customerId || null,
        items: [...input.items].sort((a, b) => a.productId.localeCompare(b.productId)),
        discountAmount: input.discountAmount,
        paymentAmount: input.paymentAmount,
        paymentMethod: input.paymentMethod,
    };
    return createHash('sha256').update(JSON.stringify(normalized)).digest('hex');
}

async function confirmedReplay(businessId: string, idempotencyKey: string, fingerprint: string) {
    const previous = await db.sale.findUnique({
        where: { businessId_idempotencyKey: { businessId, idempotencyKey } },
        select: saleResponseSelect,
    });
    return previous?.requestFingerprint === fingerprint ? previous : null;
}

function publicSale<T extends { requestFingerprint: string }>(sale: T): Omit<T, 'requestFingerprint'> {
    const { requestFingerprint: _requestFingerprint, ...result } = sale;
    return result;
}

class IdempotencyConflictError extends Error {}
class MissingRecordError extends Error {}
class InvalidSaleError extends Error {}
class InsufficientStockError extends Error {}
