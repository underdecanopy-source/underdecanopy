/**
 * @jest-environment node
 */

import { NextRequest } from 'next/server';
import { POST } from '../route';
import { getFiledReturnFile, getFiledReturnRecord } from '@/lib/smarttax/fileStore';
import { createSmtpTransport, hasSmtpConfig } from '@/lib/mail/smtp';
import { verifySecureDownloadToken } from '@/lib/smarttax/secureLinks';

jest.mock('@/lib/smarttax/fileStore', () => ({
    getFiledReturnFile: jest.fn(),
    getFiledReturnRecord: jest.fn(),
}));

jest.mock('@/lib/mail/smtp', () => ({
    createSmtpTransport: jest.fn(),
    hasSmtpConfig: jest.fn(),
}));

jest.mock('@/lib/smarttax/secureLinks', () => ({
    verifySecureDownloadToken: jest.fn(),
}));

const mockedGetFiledReturnFile = jest.mocked(getFiledReturnFile);
const mockedGetFiledReturnRecord = jest.mocked(getFiledReturnRecord);
const mockedHasSmtpConfig = jest.mocked(hasSmtpConfig);
const mockedVerifyToken = jest.mocked(verifySecureDownloadToken);

function createRequest(secureLink: string) {
    return new NextRequest('http://localhost/api/smarttax/share/email', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            ref: 'OLW-123',
            to: 'owner@example.com',
            taxId: 'TIN-1',
            secureLink,
        }),
    });
}

describe('/api/smarttax/share/email', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockedHasSmtpConfig.mockReturnValue(true);
    });

    it('rejects external download links without reading or emailing stored files', async () => {
        const response = await POST(
            createRequest('https://attacker.example/api/smarttax/download/OLW-123?token=invalid'),
        );

        expect(response.status).toBe(400);
        expect(mockedGetFiledReturnRecord).not.toHaveBeenCalled();
        expect(mockedGetFiledReturnFile).not.toHaveBeenCalled();
        expect(mockedVerifyToken).not.toHaveBeenCalled();
    });

    it('requires a valid signed token before reading or emailing a return', async () => {
        mockedVerifyToken.mockReturnValue(null);

        const response = await POST(
            createRequest('http://localhost/api/smarttax/download/OLW-123?token=invalid'),
        );

        expect(response.status).toBe(403);
        expect(mockedGetFiledReturnRecord).not.toHaveBeenCalled();
        expect(mockedGetFiledReturnFile).not.toHaveBeenCalled();
        expect(createSmtpTransport).not.toHaveBeenCalled();
    });
});
