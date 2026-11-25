import { createHash, randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@/lib/generated/prisma';
import { z } from 'zod';
import { requireBusinessAccess } from '@/lib/olowo/businessAccess';
import db from '@/lib/prisma';

const purchaseSchema = z.object({
    supplierId: z.string().trim().min(1).max(64),
    warehouseId: z.string().trim().min(1).max(64),
    items: z.array(z.object({
        productId: z.string().trim().min(1).max(64),
        quantity: z.number().finite().positive().max(999999999)
            .refine((value) => Number(value.toFixed(3)) === value),
        unitCost: z.number().finite().min(0).max(9999999999.99)
            .refine((value) => Number(value.toFixed(2)) === value),
    })).min(1).max(100),
    taxAmount: z.number().finite().min(0).max(9999999999.99)
        .refine((value) => Number(value.toFixed(2)) === value).default(0),
    idempotencyKey: z.string().uuid(),
});

type RouteContext = { params: { businessId: string } };
type PurchaseInput = z.infer<typeof purchaseSchema>;

export async function GET(_request: NextRequest, { params }: RouteContext) {
    try {
        const access = await requireBusinessAccess(params.businessId);
        if (!access.ok) return access.response;
        const purchases = await db.purchase.findMany({
            where: { businessId: params.businessId },
            include: {
                supplier: { select: { id: true, name: true } },
                warehouse: { select: { id: true, name: true } },
                items: { select: { id: true, description: true, quantity: true, unitCost: true, lineTotal: true } },
            },
            orderBy: { occurredAt: 'desc' },
            take: 100,
        });
        return NextResponse.json(purchases);
    } catch (error) {
        console.error('List Olowo purchases failed:', error);
        return NextResponse.json({ error: 'Failed to load purchases' }, { status: 500 });
    }
}

export async function POST(request: NextRequest, { params }: RouteContext) {
    let input: PurchaseInput | undefined;
    try {
        const access = await requireBusinessAccess(params.businessId, 'purchases:write');
        if (!access.ok) return access.response;

        let body: unknown;
        try {
            body = await request.json();
        } catch {
            return NextResponse.json({ error: 'Request body must be valid JSON' }, { status: 400 });
        }
        const parsed = purchaseSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({ error: 'Validation failed', details: parsed.error.issues }, { status: 400 });
        }
        input = parsed.data;
        const fingerprint = createHash('sha256').update(JSON.stringify({
            supplierId: input.supplierId,
            warehouseId: input.warehouseId,
            items: [...input.items].sort((a, b) => a.productId.localeCompare(b.productId)),
            taxAmount: input.taxAmount,
        })).digest('hex');

        const purchase = await db.$transaction(async (tx) => {
            const previous = await tx.purchase.findUnique({
                where: {
                    businessId_idempotencyKey: {
                        businessId: params.businessId,
                        idempotencyKey: input!.idempotencyKey,
                    },
                },
            });
            if (previous) {
                if (previous.requestFingerprint !== fingerprint) throw new PurchaseConflictError();
                return { purchase: previous, replayed: true };
            }

            const [supplier, warehouse] = await Promise.all([
                tx.supplier.findFirst({ where: { id: input!.supplierId, businessId: params.businessId }, select: { id: true } }),
                tx.warehouse.findFirst({ where: { id: input!.warehouseId, businessId: params.businessId, isActive: true }, select: { id: true } }),
            ]);
            if (!supplier || !warehouse) throw new MissingPurchaseRecordError();

            const products = await Promise.all(input!.items.map(async (item) => {
                const product = await tx.product.findFirst({
                    where: { id: item.productId, businessId: params.businessId, isActive: true, trackInventory: true },
                    select: { id: true, name: true },
                });
                if (!product) throw new MissingPurchaseRecordError();
                return { ...product, quantity: new Prisma.Decimal(String(item.quantity)), unitCost: new Prisma.Decimal(String(item.unitCost)) };
            }));

            const subtotal = products.reduce(
                (total, product) => total.plus(product.unitCost.mul(product.quantity)),
                new Prisma.Decimal(0),
            );
            const taxAmount = new Prisma.Decimal(String(input!.taxAmount));
            const totalAmount = subtotal.plus(taxAmount);
            const reference = `OLW-PUR-${randomUUID().replace(/-/g, '').slice(0, 16).toUpperCase()}`;

            const created = await tx.purchase.create({
                data: {
                    businessId: params.businessId,
                    supplierId: supplier.id,
                    warehouseId: warehouse.id,
                    reference,
                    status: 'COMPLETED',
                    subtotal,
                    taxAmount,
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
                            unitCost: product.unitCost,
                            lineTotal: product.unitCost.mul(product.quantity),
                        })),
                    },
                },
            });

            await Promise.all(products.map((product) =>
                tx.stockMovement.create({
                    data: {
                        businessId: params.businessId,
                        productId: product.id,
                        warehouseId: warehouse.id,
                        type: 'PURCHASE',
                        quantity: product.quantity,
                        unitCost: product.unitCost,
                        reason: `Purchase ${reference}`,
                        actorAuthUserId: access.user.id,
                        idempotencyKey: `purchase-${input!.idempotencyKey}-${product.id}`,
                    },
                }),
            ));

            const accounts = await tx.account.findMany({
                where: { businessId: params.businessId, code: { in: ['1200', '2000', '2200'] } },
                select: { id: true, code: true },
            });
            const accountId = Object.fromEntries(accounts.map((account) => [account.code, account.id]));
            if (!accountId['1200']) throw new MissingPurchaseAccountError();
            if (!accountId['2000']) throw new MissingPurchaseAccountError();

            await tx.journalEntry.create({
                data: {
                    businessId: params.businessId,
                    sourceType: 'PURCHASE',
                    sourceId: created.id,
                    memo: `Completed purchase ${reference}`,
                    actorAuthUserId: access.user.id,
                    lines: {
                        create: [
                            { accountId: accountId['1200'], debit: subtotal.plus(taxAmount), credit: new Prisma.Decimal(0) },
                            { accountId: accountId['2000'], debit: new Prisma.Decimal(0), credit: totalAmount },
                        ],
                    },
                },
            });
            await tx.auditLog.create({
                data: {
                    businessId: params.businessId,
                    actorAuthUserId: access.user.id,
                    action: 'PURCHASE_COMPLETED',
                    entity: 'Purchase',
                    entityId: created.id,
                    metadata: { reference, supplierId: supplier.id, totalAmount: totalAmount.toString() },
                },
            });
            await tx.businessEvent.create({
                data: {
                    businessId: params.businessId,
                    eventType: 'PURCHASE_COMPLETED',
                    entityType: 'Purchase',
                    entityId: created.id,
                    actorAuthUserId: access.user.id,
                    data: { reference, supplierId: supplier.id, totalAmount: totalAmount.toString() },
                },
            });
            return { purchase: created, replayed: false };
        }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });

        return NextResponse.json(purchase, { status: purchase.replayed ? 200 : 201 });
    } catch (error) {
        if (error instanceof PurchaseConflictError) {
            return NextResponse.json({ error: 'Idempotency key was already used for a different purchase' }, { status: 409 });
        }
        if (error instanceof MissingPurchaseRecordError) {
            return NextResponse.json({ error: 'Supplier, warehouse, or active product not found' }, { status: 400 });
        }
        if (error instanceof MissingPurchaseAccountError) {
            return NextResponse.json({ error: 'Required inventory or payable accounts are missing' }, { status: 409 });
        }
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2034') {
            return NextResponse.json({ error: 'Purchase changed concurrently. Refresh and retry.' }, { status: 409 });
        }
        console.error('Create Olowo purchase failed:', error);
        return NextResponse.json({ error: 'Failed to record purchase' }, { status: 500 });
    }
}

class PurchaseConflictError extends Error {}
class MissingPurchaseRecordError extends Error {}
class MissingPurchaseAccountError extends Error {}
