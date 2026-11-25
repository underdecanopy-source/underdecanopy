/**
 * @jest-environment node
 */

import { POST } from '../route';
import { requireBusinessAccess } from '@/lib/olowo/businessAccess';

jest.mock('@/lib/olowo/businessAccess', () => ({
    requireBusinessAccess: jest.fn(),
}));

const mockedAccess = requireBusinessAccess as jest.MockedFunction<typeof requireBusinessAccess>;

describe('Olowo expense route', () => {
    beforeEach(() => jest.clearAllMocks());

    it('rejects invalid expense input', async () => {
        mockedAccess.mockResolvedValue({
            ok: true,
            user: { id: 'u' },
            role: 'OWNER',
        } as never);
        const request = new Request('http://localhost/api/businesses/b/expenses', {
            method: 'POST',
            body: JSON.stringify({ amount: -1 }),
        });
        const response = await POST(request as never, { params: { businessId: 'b' } });
        expect(response.status).toBe(400);
    });

    it('requires authentication', async () => {
        mockedAccess.mockResolvedValue({
            ok: false,
            response: new Response(JSON.stringify({ error: 'Authentication required' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            }) as never,
        });
        const request = new Request('http://localhost/api/businesses/b/expenses', {
            method: 'POST',
            body: '{}',
        });
        const response = await POST(request as never, { params: { businessId: 'b' } });
        expect(response.status).toBe(401);
    });
});
