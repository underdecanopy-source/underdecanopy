/**
 * @jest-environment node
 */

import { POST } from '../route';
import { requireBusinessAccess } from '@/lib/olowo/businessAccess';
import db from '@/lib/prisma';

jest.mock('@/lib/olowo/businessAccess', () => ({
    requireBusinessAccess: jest.fn(),
}));
jest.mock('@/lib/prisma', () => ({
    __esModule: true,
    default: {
        $transaction: jest.fn(),
    },
}));

const mockedAccess = requireBusinessAccess as jest.MockedFunction<typeof requireBusinessAccess>;
const mockedDb = db as unknown as { $transaction: jest.Mock };

describe('Olowo sale payment route', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('requires authentication and business sales write access', async () => {
        mockedAccess.mockResolvedValue({
            ok: false,
            response: new Response(JSON.stringify({ error: 'Authentication required' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            }) as never,
        });

        const request = new Request('http://localhost/api/businesses/b/sales/s/payments', {
            method: 'POST',
            body: JSON.stringify({
                amount: 100,
                method: 'CASH',
                idempotencyKey: '00000000-0000-4000-8000-000000000001',
            }),
        });

        const response = await POST(request as never, { params: { businessId: 'b', saleId: 's' } });

        expect(response.status).toBe(401);
        expect(mockedDb.$transaction).not.toHaveBeenCalled();
    });

    it('rejects invalid payment input', async () => {
        mockedAccess.mockResolvedValue({
            ok: true,
            user: { id: 'u' },
            role: 'OWNER',
        } as never);

        const request = new Request('http://localhost/api/businesses/b/sales/s/payments', {
            method: 'POST',
            body: JSON.stringify({
                amount: -1,
                method: 'CASH',
                idempotencyKey: '00000000-0000-4000-8000-000000000001',
            }),
        });

        const response = await POST(request as never, { params: { businessId: 'b', saleId: 's' } });

        expect(response.status).toBe(400);
        expect(mockedDb.$transaction).not.toHaveBeenCalled();
    });
});
