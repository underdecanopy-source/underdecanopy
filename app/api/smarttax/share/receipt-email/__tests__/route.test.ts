/**
 * @jest-environment node
 */

import { NextRequest } from 'next/server';
import { POST } from '../route';
import { getUser } from '@/lib/auth/server';
import { createSmtpTransport } from '@/lib/mail/smtp';

jest.mock('@/lib/auth/server', () => ({
    getUser: jest.fn(),
}));

jest.mock('@/lib/mail/smtp', () => ({
    createSmtpTransport: jest.fn(),
    hasSmtpConfig: jest.fn(),
}));

const mockedGetUser = jest.mocked(getUser);

describe('/api/smarttax/share/receipt-email', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('requires authentication before parsing or sending a receipt email', async () => {
        mockedGetUser.mockResolvedValue(null);
        const request = new NextRequest('http://localhost/api/smarttax/share/receipt-email', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: '{}',
        });

        const response = await POST(request);

        expect(response.status).toBe(401);
        expect(createSmtpTransport).not.toHaveBeenCalled();
    });
});
