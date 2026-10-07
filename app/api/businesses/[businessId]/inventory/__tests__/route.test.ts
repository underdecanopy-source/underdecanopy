/**
 * @jest-environment node
 */

import { NextRequest } from 'next/server';
import { Prisma } from '@/lib/generated/prisma';
import { getUser } from '@/lib/auth/server';
import db from '@/lib/prisma';
import { GET, POST } from '../route';
import { POST as createProduct } from '../products/route';
import { POST as createWarehouse } from '../warehouses/route';

jest.mock('@/lib/auth/server', () => ({ getUser: jest.fn() }));
jest.mock('@/lib/prisma', () => ({
    __esModule: true,
    default: {
        businessMembership: { findUnique: jest.fn() },
        business: { findUnique: jest.fn() },
        product: { findMany: jest.fn() },
        warehouse: { findMany: jest.fn() },
        stockMovement: { findUnique: jest.fn(), groupBy: jest.fn(), findMany: jest.fn() },
        $transaction: jest.fn(),
    },
}));

const mockedGetUser = jest.mocked(getUser);
const mockedDb = jest.mocked(db);
const businessId = 'business-1';
const routeContext = { params: { businessId } };

function request(body: unknown) {
    return new NextRequest(`http://localhost/api/businesses/${businessId}/inventory`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
    });
}

function setAccess(role = 'OWNER') {
    mockedGetUser.mockResolvedValue({ id: 'auth-user-1' } as Awaited<ReturnType<typeof getUser>>);
    mockedDb.businessMembership.findUnique.mockResolvedValue({ role } as never);
}

function setTransaction(tx: object) {
    mockedDb.$transaction.mockImplementation(async (callback) => {
        if (typeof callback !== 'function') throw new Error('Expected transaction callback');
        return callback(tx as never);
    });
}

describe('Olowo inventory API', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        setAccess();
    });

    it('requires membership before returning inventory', async () => {
        mockedDb.businessMembership.findUnique.mockResolvedValue(null);

        const response = await GET(request({}), routeContext);

        expect(response.status).toBe(403);
        expect(mockedDb.product.findMany).not.toHaveBeenCalled();
    });

    it('requires authentication before checking business membership', async () => {
        mockedGetUser.mockResolvedValue(null);

        const response = await GET(request({}), routeContext);

        expect(response.status).toBe(401);
        expect(mockedDb.businessMembership.findUnique).not.toHaveBeenCalled();
    });

    it('limits inventory and stock sums to the business in the route', async () => {
        mockedDb.product.findMany.mockResolvedValue([]);
        mockedDb.business.findUnique.mockResolvedValue({ id: businessId, name: 'Corner Shop' } as never);
        mockedDb.warehouse.findMany.mockResolvedValue([]);
        mockedDb.stockMovement.groupBy.mockResolvedValue([]);
        mockedDb.stockMovement.findMany.mockResolvedValue([]);

        const response = await GET(request({}), routeContext);

        expect(response.status).toBe(200);
        expect(mockedDb.business.findUnique).toHaveBeenCalledWith({
            where: { id: businessId },
            select: { id: true, name: true },
        });
        expect(mockedDb.product.findMany).toHaveBeenCalledWith(expect.objectContaining({
            where: { businessId, isActive: true },
        }));
        expect(mockedDb.stockMovement.groupBy).toHaveBeenCalledWith(expect.objectContaining({
            where: { businessId },
        }));
        expect(mockedDb.stockMovement.findMany).toHaveBeenCalledWith(expect.objectContaining({
            where: { businessId },
            take: 50,
        }));
    });

    it('restricts inventory writes to authorized business roles', async () => {
        setAccess('EMPLOYEE');
        const response = await createWarehouse(request({ name: 'Main' }), routeContext);

        expect(response.status).toBe(403);
        expect(mockedDb.$transaction).not.toHaveBeenCalled();
    });

    it('creates products and their audit entries atomically', async () => {
        const product = { id: 'product-1', name: 'Rice' };
        const tx = {
            productCategory: { upsert: jest.fn().mockResolvedValue({ id: 'category-1' }) },
            product: { create: jest.fn().mockResolvedValue(product) },
            auditLog: { create: jest.fn().mockResolvedValue({}) },
        };
        setTransaction(tx);

        const response = await createProduct(request({
            name: ' Rice ',
            sku: 'RICE-1',
            category: 'Staples',
            unit: 'bag',
            costPrice: 12.35,
            sellingPrice: 15,
            trackInventory: true,
        }), routeContext);

        expect(response.status).toBe(201);
        expect(tx.product.create).toHaveBeenCalledWith(expect.objectContaining({
            data: expect.objectContaining({
                businessId,
                name: 'Rice',
                sku: 'RICE-1',
                categoryId: 'category-1',
                costPrice: new Prisma.Decimal('12.35'),
                sellingPrice: new Prisma.Decimal('15'),
            }),
        }));
        expect(tx.auditLog.create).toHaveBeenCalledWith(expect.objectContaining({
            data: expect.objectContaining({ businessId, action: 'PRODUCT_CREATED' }),
        }));
    });

    it('validates product prices before opening a database transaction', async () => {
        const response = await createProduct(request({
            name: 'Rice',
            costPrice: 1.234,
            sellingPrice: 2,
        }), routeContext);

        expect(response.status).toBe(400);
        expect(mockedDb.$transaction).not.toHaveBeenCalled();
    });

    it('creates a warehouse with an audit record atomically', async () => {
        const tx = {
            warehouse: { create: jest.fn().mockResolvedValue({ id: 'warehouse-1', name: 'Main' }) },
            auditLog: { create: jest.fn().mockResolvedValue({}) },
        };
        setTransaction(tx);

        const response = await createWarehouse(request({ name: ' Main ' }), routeContext);

        expect(response.status).toBe(201);
        expect(tx.warehouse.create).toHaveBeenCalledWith({
            data: { businessId, name: 'Main', address: null },
        });
        expect(tx.auditLog.create).toHaveBeenCalledWith(expect.objectContaining({
            data: expect.objectContaining({ action: 'WAREHOUSE_CREATED' }),
        }));
    });

    it('records signed stock adjustments and audit data in one serializable transaction', async () => {
        const movement = { id: 'movement-1', quantity: new Prisma.Decimal('-2') };
        const tx = {
            stockMovement: {
                findUnique: jest.fn().mockResolvedValue(null),
                aggregate: jest.fn().mockResolvedValue({ _sum: { quantity: new Prisma.Decimal('5') } }),
                create: jest.fn().mockResolvedValue(movement),
            },
            product: { findFirst: jest.fn().mockResolvedValue({ id: 'product-1' }) },
            warehouse: { findFirst: jest.fn().mockResolvedValue({ id: 'warehouse-1' }) },
            auditLog: { create: jest.fn().mockResolvedValue({}) },
        };
        setTransaction(tx);

        const response = await POST(request({
            productId: 'product-1',
            warehouseId: 'warehouse-1',
            direction: 'OUT',
            quantity: 2,
            reason: 'Damaged goods',
            idempotencyKey: '75f66b8b-1d48-4c9e-9356-1813eaacbc4b',
        }), routeContext);

        expect(response.status).toBe(201);
        expect(mockedDb.$transaction).toHaveBeenCalledWith(expect.any(Function), {
            isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        });
        expect(tx.stockMovement.create).toHaveBeenCalledWith(expect.objectContaining({
            data: expect.objectContaining({ type: 'ADJUSTMENT', quantity: new Prisma.Decimal('-2') }),
        }));
        expect(tx.product.findFirst).toHaveBeenCalledWith(expect.objectContaining({
            where: { id: 'product-1', businessId, isActive: true, trackInventory: true },
        }));
        expect(tx.warehouse.findFirst).toHaveBeenCalledWith(expect.objectContaining({
            where: { id: 'warehouse-1', businessId, isActive: true },
        }));
        expect(tx.auditLog.create).toHaveBeenCalledWith(expect.objectContaining({
            data: expect.objectContaining({ action: 'INVENTORY_ADJUSTED', entityId: 'movement-1' }),
        }));
    });

    it('rejects adjustments that would make stock negative without creating a movement', async () => {
        const tx = {
            stockMovement: {
                findUnique: jest.fn().mockResolvedValue(null),
                aggregate: jest.fn().mockResolvedValue({ _sum: { quantity: new Prisma.Decimal('1') } }),
                create: jest.fn(),
            },
            product: { findFirst: jest.fn().mockResolvedValue({ id: 'product-1' }) },
            warehouse: { findFirst: jest.fn().mockResolvedValue({ id: 'warehouse-1' }) },
            auditLog: { create: jest.fn() },
        };
        setTransaction(tx);

        const response = await POST(request({
            productId: 'product-1',
            warehouseId: 'warehouse-1',
            direction: 'OUT',
            quantity: 2,
            reason: 'Correction',
            idempotencyKey: '75f66b8b-1d48-4c9e-9356-1813eaacbc4b',
        }), routeContext);

        expect(response.status).toBe(409);
        expect(tx.stockMovement.create).not.toHaveBeenCalled();
        expect(tx.auditLog.create).not.toHaveBeenCalled();
    });

    it('rejects reuse of an idempotency key with different adjustment data', async () => {
        const tx = {
            stockMovement: {
                findUnique: jest.fn().mockResolvedValue({
                    id: 'movement-1',
                    productId: 'product-1',
                    warehouseId: 'warehouse-1',
                    quantity: new Prisma.Decimal('2'),
                    reason: 'Opening count',
                }),
                aggregate: jest.fn(),
                create: jest.fn(),
            },
            product: { findFirst: jest.fn() },
            warehouse: { findFirst: jest.fn() },
            auditLog: { create: jest.fn() },
        };
        setTransaction(tx);

        const response = await POST(request({
            productId: 'product-1',
            warehouseId: 'warehouse-1',
            direction: 'OUT',
            quantity: 2,
            reason: 'Different adjustment',
            idempotencyKey: '75f66b8b-1d48-4c9e-9356-1813eaacbc4b',
        }), routeContext);

        expect(response.status).toBe(409);
        expect(tx.stockMovement.create).not.toHaveBeenCalled();
    });

    it('replays the same adjustment idempotently without duplicating audit or stock entries', async () => {
        const previous = {
            id: 'movement-1',
            productId: 'product-1',
            warehouseId: 'warehouse-1',
            quantity: new Prisma.Decimal('2'),
            reason: 'Opening count',
        };
        const tx = {
            stockMovement: {
                findUnique: jest.fn().mockResolvedValue(previous),
                aggregate: jest.fn(),
                create: jest.fn(),
            },
            product: { findFirst: jest.fn() },
            warehouse: { findFirst: jest.fn() },
            auditLog: { create: jest.fn() },
        };
        setTransaction(tx);

        const response = await POST(request({
            productId: 'product-1',
            warehouseId: 'warehouse-1',
            direction: 'IN',
            quantity: 2,
            reason: 'Opening count',
            idempotencyKey: '75f66b8b-1d48-4c9e-9356-1813eaacbc4b',
        }), routeContext);
        const payload = await response.json();

        expect(response.status).toBe(200);
        expect(payload.replayed).toBe(true);
        expect(tx.stockMovement.create).not.toHaveBeenCalled();
        expect(tx.auditLog.create).not.toHaveBeenCalled();
    });

    it('confirms a concurrent idempotent retry after the database reports a duplicate key', async () => {
        mockedDb.$transaction.mockRejectedValue(new Prisma.PrismaClientKnownRequestError('duplicate key', {
            code: 'P2002',
            clientVersion: 'test',
        }));
        mockedDb.stockMovement.findUnique.mockResolvedValue({
            id: 'movement-1',
            productId: 'product-1',
            warehouseId: 'warehouse-1',
            quantity: new Prisma.Decimal('2'),
            reason: 'Opening count',
        } as never);

        const response = await POST(request({
            productId: 'product-1',
            warehouseId: 'warehouse-1',
            direction: 'IN',
            quantity: 2,
            reason: 'Opening count',
            idempotencyKey: '75f66b8b-1d48-4c9e-9356-1813eaacbc4b',
        }), routeContext);
        const payload = await response.json();

        expect(response.status).toBe(200);
        expect(payload.replayed).toBe(true);
    });

});
