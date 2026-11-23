/**
 * @jest-environment node
 */

import { NextRequest } from 'next/server';
import { Prisma } from '@/lib/generated/prisma';
import { getUser } from '@/lib/auth/server';
import db from '@/lib/prisma';
import { POST } from '../route';

jest.mock('@/lib/auth/server', () => ({ getUser: jest.fn() }));
jest.mock('@/lib/prisma', () => ({
    __esModule: true,
    default: {
        businessMembership: { findUnique: jest.fn() },
        sale: { findUnique: jest.fn() },
        $transaction: jest.fn(),
    },
}));

const mockedGetUser = jest.mocked(getUser);
const mockedDb = jest.mocked(db);
const businessId = 'business-1';
const context = { params: { businessId } };

function request(body: unknown) {
    return new NextRequest(`http://localhost/api/businesses/${businessId}/sales`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
    });
}

function validSale(overrides: Record<string, unknown> = {}) {
    return {
        warehouseId: 'warehouse-1',
        customerId: 'customer-1',
        items: [{ productId: 'product-1', quantity: 2 }],
        paymentAmount: 30,
        paymentMethod: 'POS',
        idempotencyKey: '75f66b8b-1d48-4c9e-9356-1813eaacbc4b',
        ...overrides,
    };
}

describe('Olowo sales API', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockedGetUser.mockResolvedValue({ id: 'auth-user-1' } as Awaited<ReturnType<typeof getUser>>);
        mockedDb.businessMembership.findUnique.mockResolvedValue({ role: 'SALES_STAFF' } as never);
    });

    it('requires a business membership before recording a sale', async () => {
        mockedDb.businessMembership.findUnique.mockResolvedValue(null);

        const response = await POST(request(validSale()), context);

        expect(response.status).toBe(403);
        expect(mockedDb.$transaction).not.toHaveBeenCalled();
    });

    it('records stock, payment, journal entry and audit history atomically', async () => {
        const tx = {
            sale: {
                findUnique: jest.fn().mockResolvedValue(null),
                create: jest.fn().mockResolvedValue({
                    id: 'sale-1',
                    reference: 'OLW-SALE-1',
                    requestFingerprint: 'fingerprint',
                    paymentStatus: 'PAID',
                    totalAmount: new Prisma.Decimal('30'),
                    occurredAt: new Date('2026-11-22T00:00:00Z'),
                    items: [],
                    payments: [],
                }),
            },
            warehouse: { findFirst: jest.fn().mockResolvedValue({ id: 'warehouse-1' }) },
            customer: { findFirst: jest.fn().mockResolvedValue({ id: 'customer-1' }) },
            product: {
                findFirst: jest.fn().mockResolvedValue({
                    id: 'product-1',
                    name: 'Rice',
                    sellingPrice: new Prisma.Decimal('15'),
                    costPrice: new Prisma.Decimal('10'),
                    trackInventory: true,
                }),
            },
            stockMovement: {
                aggregate: jest.fn().mockResolvedValue({ _sum: { quantity: new Prisma.Decimal('5') } }),
                create: jest.fn().mockResolvedValue({ id: 'movement-1' }),
            },
            account: {
                upsert: jest.fn().mockImplementation(({ where }) => Promise.resolve({ id: `account-${where.businessId_code.code}`, code: where.businessId_code.code })),
            },
            journalEntry: { create: jest.fn().mockResolvedValue({ id: 'journal-1' }) },
            auditLog: { create: jest.fn().mockResolvedValue({}) },
            businessEvent: { create: jest.fn().mockResolvedValue({}) },
        };
        mockedDb.$transaction.mockImplementation(async (callback) => {
            if (typeof callback !== 'function') throw new Error('Expected transaction callback');
            return callback(tx as never);
        });

        const response = await POST(request(validSale()), context);
        const payload = await response.json();

        expect(response.status).toBe(201);
        expect(payload.replayed).toBe(false);
        expect(tx.stockMovement.create).toHaveBeenCalledWith(expect.objectContaining({
            data: expect.objectContaining({ businessId, type: 'SALE', quantity: new Prisma.Decimal('-2') }),
        }));
        expect(tx.journalEntry.create).toHaveBeenCalledWith(expect.objectContaining({
            data: expect.objectContaining({ businessId, sourceType: 'SALE', sourceId: 'sale-1' }),
        }));
        expect(tx.auditLog.create).toHaveBeenCalledWith(expect.objectContaining({
            data: expect.objectContaining({ businessId, action: 'SALE_COMPLETED', entityId: 'sale-1' }),
        }));
        expect(tx.businessEvent.create).toHaveBeenCalledWith(expect.objectContaining({
            data: expect.objectContaining({ businessId, eventType: 'SALE_COMPLETED', entityId: 'sale-1' }),
        }));
    });

    it('rejects a credit sale without a customer before writing anything', async () => {
        const tx = {
            sale: { findUnique: jest.fn().mockResolvedValue(null), create: jest.fn() },
            warehouse: { findFirst: jest.fn().mockResolvedValue({ id: 'warehouse-1' }) },
            product: {
                findFirst: jest.fn().mockResolvedValue({
                    id: 'product-1', name: 'Rice', sellingPrice: new Prisma.Decimal('15'),
                    costPrice: new Prisma.Decimal('10'), trackInventory: false,
                }),
            },
            stockMovement: { aggregate: jest.fn() },
        };
        mockedDb.$transaction.mockImplementation(async (callback) => {
            if (typeof callback !== 'function') throw new Error('Expected transaction callback');
            return callback(tx as never);
        });

        const response = await POST(request(validSale({ customerId: undefined, paymentAmount: 0 })), context);

        expect(response.status).toBe(400);
        expect(tx.sale.create).not.toHaveBeenCalled();
    });
});
