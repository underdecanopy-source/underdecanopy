import crypto from 'node:crypto';

export interface SecureDownloadTokenPayload {
    ref: string;
    taxId: string;
    exp: number;
}

function getSecret(): string {
    const secret = process.env.SMARTTAX_DEMO_FILE_SECRET || process.env.JWT_SECRET;
    if (!secret || secret.length < 32) {
        throw new Error('Configure SMARTTAX_DEMO_FILE_SECRET or JWT_SECRET with at least 32 characters.');
    }
    return secret;
}

function toBase64Url(value: Buffer | string): string {
    return Buffer.from(value)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/g, '');
}

function fromBase64Url(value: string): Buffer {
    const padded = value.replace(/-/g, '+').replace(/_/g, '/');
    const remainder = padded.length % 4;
    const normalized = remainder === 0 ? padded : `${padded}${'='.repeat(4 - remainder)}`;
    return Buffer.from(normalized, 'base64');
}

function sign(value: string): string {
    return toBase64Url(crypto.createHmac('sha256', getSecret()).update(value).digest());
}

export function createSecureDownloadToken(input: {
    ref: string;
    taxId: string;
    expiresInSeconds?: number;
}): string {
    const payload: SecureDownloadTokenPayload = {
        ref: input.ref,
        taxId: input.taxId,
        exp: Math.floor(Date.now() / 1000) + (input.expiresInSeconds ?? 60 * 60 * 24 * 7),
    };
    const encodedPayload = toBase64Url(JSON.stringify(payload));
    const signature = sign(encodedPayload);
    return `${encodedPayload}.${signature}`;
}

export function verifySecureDownloadToken(token: string): SecureDownloadTokenPayload | null {
    const [encodedPayload, encodedSignature] = token.split('.');
    if (!encodedPayload || !encodedSignature) {
        return null;
    }

    try {
        const expectedSignature = sign(encodedPayload);
        const provided = Buffer.from(encodedSignature);
        const expected = Buffer.from(expectedSignature);
        if (provided.length !== expected.length || !crypto.timingSafeEqual(provided, expected)) {
            return null;
        }

        const payload = JSON.parse(fromBase64Url(encodedPayload).toString('utf8')) as SecureDownloadTokenPayload;
        if (
            typeof payload.ref !== 'string' ||
            !payload.ref ||
            typeof payload.taxId !== 'string' ||
            !payload.taxId ||
            typeof payload.exp !== 'number' ||
            !Number.isFinite(payload.exp)
        ) {
            return null;
        }
        if (payload.exp < Math.floor(Date.now() / 1000)) {
            return null;
        }
        return payload;
    } catch {
        return null;
    }
}
