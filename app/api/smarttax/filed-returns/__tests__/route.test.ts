/**
 * @jest-environment node
 */

import { NextRequest } from 'next/server';
import { POST } from '../route';
import { getUser } from '@/lib/auth/server';
import { saveFiledReturn } from '@/lib/smarttax/fileStore';

jest.mock('@/lib/auth/server', () => ({
    getUser: jest.fn(),
}));

jest.mock('@/lib/smarttax/fileStore', () => ({
    saveFiledReturn: jest.fn(),
}));

jest.mock('@/lib/smarttax/secureLinks', () => ({
    createSecureDownloadToken: jest.fn(),
}));

const mockedGetUser = jest.mocked(getUser);

describe('/api/smarttax/filed-returns', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('requires authentication before accepting a return PDF', async () => {
        mockedGetUser.mockResolvedValue(null);
        const request = new NextRequest('http://localhost/api/smarttax/filed-returns', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: '{}',
        });

        const response = await POST(request);

        expect(response.status).toBe(401);
        expect(saveFiledReturn).not.toHaveBeenCalled();
    });
});
