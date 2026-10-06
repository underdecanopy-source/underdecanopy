import { createSecureDownloadToken, verifySecureDownloadToken } from '../secureLinks';

describe('secure filed-return download tokens', () => {
    const originalSecret = process.env.SMARTTAX_DEMO_FILE_SECRET;
    const originalJwtSecret = process.env.JWT_SECRET;

    afterEach(() => {
        if (originalSecret === undefined) {
            delete process.env.SMARTTAX_DEMO_FILE_SECRET;
        } else {
            process.env.SMARTTAX_DEMO_FILE_SECRET = originalSecret;
        }
        if (originalJwtSecret === undefined) {
            delete process.env.JWT_SECRET;
        } else {
            process.env.JWT_SECRET = originalJwtSecret;
        }
    });

    it('requires a dedicated secret of at least 32 characters', () => {
        delete process.env.SMARTTAX_DEMO_FILE_SECRET;
        delete process.env.JWT_SECRET;
        expect(() => createSecureDownloadToken({ ref: 'OLW-123', taxId: 'TIN-1' })).toThrow(
            'Configure SMARTTAX_DEMO_FILE_SECRET or JWT_SECRET with at least 32 characters.',
        );

        process.env.SMARTTAX_DEMO_FILE_SECRET = 'too-short';
        expect(() => createSecureDownloadToken({ ref: 'OLW-123', taxId: 'TIN-1' })).toThrow(
            'Configure SMARTTAX_DEMO_FILE_SECRET or JWT_SECRET with at least 32 characters.',
        );
    });

    it('verifies a signed token and rejects tampering and expiration', () => {
        process.env.SMARTTAX_DEMO_FILE_SECRET = 'olowo-test-secret-at-least-32-chars';
        const validToken = createSecureDownloadToken({ ref: 'OLW-123', taxId: 'TIN-1' });
        const expiredToken = createSecureDownloadToken({ ref: 'OLW-123', taxId: 'TIN-1', expiresInSeconds: -1 });

        expect(verifySecureDownloadToken(validToken)).toMatchObject({ ref: 'OLW-123', taxId: 'TIN-1' });
        expect(verifySecureDownloadToken(`${validToken}x`)).toBeNull();
        expect(verifySecureDownloadToken(expiredToken)).toBeNull();
    });
});
