import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@/lib/generated/prisma';
import { z } from 'zod';
import { requireBusinessAccess } from '@/lib/olowo/businessAccess';
import db from '@/lib/prisma';

const adjustmentSchema = z.object({
    productId: z.string().trim().min(1).max(64),
    warehouseId: z.string().trim().min(1).max(64),
    direction: z.enum(['IN', 'OUT']),
    quantity: z.number().finite().positive().max(999999999)
        .refine((value) => Number(value.toFixed(3)) === value, 'Quantity may have up to 3 decimal places'),
    reason: z.string().trim().min(1).max(200),
    idempotencyKey: z.string().uuid(),
});

type RouteContext = { params: { businessId: string } };

export async function GET(_request: NextRequest, { params }: RouteContext) {
    try {
        const access = await requireBusinessAccess(params.businessId);
        if (!access.ok) return access.response;

        const [business, products, warehouses, movementTotals, recentMovements] = await Promise.all([
            db.business.findUnique({
                where: { id: params.businessId },
                select: { id: true, name: true },
            }),
            db.product.findMany({
                where: { businessId: params.businessId, isActive: true },
                include: { category: { select: { id: true, name: true } } },
                orderBy: { name: 'asc' },
            }),
            db.warehouse.findMany({
                where: { businessId: params.businessId, isActive: true },
                orderBy: { name: 'asc' },
            }),
            db.stockMovement.groupBy({
                by: ['productId', 'warehouseId'],
                where: { businessId: params.businessId },
                _sum: { quantity: true },
            }),
            db.stockMovement.findMany({
                where: { businessId: params.businessId },
                select: {
                    id: true,
                    type: true,
                    quantity: true,
                    reason: true,
                    createdAt: true,
                    product: { select: { name: true, unit: true } },
                    warehouse: { select: { name: true } },
                },
                orderBy: { createdAt: 'desc' },
                take: 50,
            }),
        ]);
        if (!business) {
            return NextResponse.json({ error: 'Business not found' }, { status: 404 });
        }

        const quantities = new Map(
            movementTotals.map(({ productId, warehouseId, _sum }) => [
                `${productId}:${warehouseId}`,
                _sum.quantity?.toString() ?? '0',
            ]),
        );

        return NextResponse.json({
            business,
            products: products.map((product) => ({
                ...product,
                stockByWarehouse: warehouses.map((warehouse) => ({
                    warehouseId: warehouse.id,
                    quantity: quantities.get(`${product.id}:${warehouse.id}`) ?? '0',
                })),
            })),
            warehouses,
            recentMovements,
        });
    } catch (error) {
        console.error('List Olowo inventory failed:', error);
        return NextResponse.json({ error: 'Failed to load inventory' }, { status: 500 });
    }
}

export async function POST(request: NextRequest, { params }: RouteContext) {
    let requestForReplay: z.infer<typeof adjustmentSchema> | undefined;
    try {
        const access = await requireBusinessAccess(params.businessId, true);
        if (!access.ok) return access.response;

        let body: unknown;
        try {
            body = await request.json();
        } catch {
            return NextResponse.json({ error: 'Request body must be valid JSON' }, { status: 400 });
        }

        const parsed = adjustmentSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({ error: 'Validation failed', details: parsed.error.issues }, { status: 400 });
        }
        requestForReplay = parsed.data;
        requestForReplay = parsed.data;
        const { productId, warehouseId, direction, quantity, reason, idempotencyKey } = parsed.data;
        const signedQuantity = new Prisma.Decimal(direction === 'IN' ? quantity : -quantity);
        const movement = await db.$transaction(async (tx) => {
            const previous = await tx.stockMovement.findUnique({
                where: {
                    businessId_idempotencyKey: {
                        businessId: params.businessId,
                        idempotencyKey,
                    },
                },
            });
            if (previous) {
                if (
                    previous.productId !== productId ||
                    previous.warehouseId !== warehouseId ||
                    !previous.quantity.equals(signedQuantity) ||
                    previous.reason !== reason
                ) {
                    throw new IdempotencyConflictError();
                }
                return { movement: previous, replayed: true };
            }

            const [product, warehouse] = await Promise.all([
                tx.product.findFirst({
                    where: { id: productId, businessId: params.businessId, isActive: true, trackInventory: true },
                    select: { id: true },
                }),
                tx.warehouse.findFirst({
                    where: { id: warehouseId, businessId: params.businessId, isActive: true },
                    select: { id: true },
                }),
            ]);
            if (!product || !warehouse) throw new InventoryRecordNotFoundError();

            const current = await tx.stockMovement.aggregate({
                where: { businessId: params.businessId, productId, warehouseId },
                _sum: { quantity: true },
            });
            const newQuantity = (current._sum.quantity ?? new Prisma.Decimal(0)).plus(signedQuantity);
            if (newQuantity.lessThan(0)) throw new InsufficientStockError();

            const created = await tx.stockMovement.create({
                data: {
                    businessId: params.businessId,
                    productId,
                    warehouseId,
                    type: 'ADJUSTMENT',
                    quantity: signedQuantity,
                    reason,
                    idempotencyKey,
                    actorAuthUserId: access.user.id,
                },
            });
            await tx.auditLog.create({
                data: {
                    businessId: params.businessId,
                    actorAuthUserId: access.user.id,
                    action: 'INVENTORY_ADJUSTED',
                    entity: 'StockMovement',
                    entityId: created.id,
                    metadata: { direction, quantity, reason, productId, warehouseId },
                },
            });
            return { movement: created, replayed: false };
        }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });

        return NextResponse.json({
            movement: {
                id: movement.movement.id,
                type: movement.movement.type,
                quantity: movement.movement.quantity,
                reason: movement.movement.reason,
                createdAt: movement.movement.createdAt,
            },
            replayed: movement.replayed,
        }, { status: movement.replayed ? 200 : 201 });
    } catch (error) {
        if (error instanceof IdempotencyConflictError) {
            return NextResponse.json({ error: 'Idempotency key was already used for a different adjustment' }, { status: 409 });
        }
        if (error instanceof InventoryRecordNotFoundError) {
            return NextResponse.json({ error: 'Active inventory product or warehouse not found' }, { status: 404 });
        }
        if (error instanceof InsufficientStockError) {
            return NextResponse.json({ error: 'Adjustment would make stock negative' }, { status: 409 });
        }
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2034') {
            return NextResponse.json({ error: 'Inventory changed concurrently. Retry the adjustment.' }, { status: 409 });
        }
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            if (requestForReplay) {
                try {
                    const previous = await db.stockMovement.findUnique({
                        where: {
                            businessId_idempotencyKey: {
                                businessId: params.businessId,
                                idempotencyKey: requestForReplay.idempotencyKey,
                            },
                        },
                    });
                    const signedQuantity = new Prisma.Decimal(
                        requestForReplay.direction === 'IN' ? requestForReplay.quantity : -requestForReplay.quantity,
                    );
                    if (
                        previous &&
                        previous.productId === requestForReplay.productId &&
                        previous.warehouseId === requestForReplay.warehouseId &&
                        previous.quantity.equals(signedQuantity) &&
                        previous.reason === requestForReplay.reason
                    ) {
                        return NextResponse.json({
                            movement: {
                                id: previous.id,
                                type: previous.type,
                                quantity: previous.quantity,
                                reason: previous.reason,
                                createdAt: previous.createdAt,
                            },
                            replayed: true,
                        }, { status: 200 });
                    }
                    if (previous) {
                        return NextResponse.json(
                            { error: 'Idempotency key was already used for a different adjustment' },
                            { status: 409 },
                        );
                    }
                } catch (lookupError) {
                    console.error('Look up retried Olowo inventory adjustment failed:', lookupError);
                    return NextResponse.json({ error: 'Unable to confirm whether the adjustment was recorded' }, { status: 500 });
                }
            }
            return NextResponse.json({ error: 'This adjustment may already have been recorded. Refresh inventory before retrying.' }, { status: 409 });
        }
        console.error('Create Olowo inventory adjustment failed:', error);
        return NextResponse.json({ error: 'Failed to record inventory adjustment' }, { status: 500 });
    }
}

class IdempotencyConflictError extends Error {}
class InventoryRecordNotFoundError extends Error {}
class InsufficientStockError extends Error {}
