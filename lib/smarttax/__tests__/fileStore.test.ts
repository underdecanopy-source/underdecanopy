import { getFiledReturnFile, getFiledReturnRecord, saveFiledReturn } from '../fileStore';

describe('filed-return storage references', () => {
    it('rejects path traversal references before accessing storage', async () => {
        await expect(getFiledReturnRecord('../../package')).resolves.toBeNull();
        await expect(getFiledReturnFile('..\\..\\package')).resolves.toBeNull();
        await expect(
            saveFiledReturn({
                record: {
                    ref: '../package',
                    fileName: 'return.pdf',
                    mimeType: 'application/pdf',
                    taxType: 'VAT',
                    taxId: 'TIN-1',
                    taxpayerName: 'Example',
                    filingPeriod: '2026-01',
                    createdAt: new Date().toISOString(),
                    verificationHash: 'abc',
                },
                fileBuffer: Buffer.from('%PDF-'),
            }),
        ).rejects.toThrow('Invalid filed-return reference.');
    });
});
