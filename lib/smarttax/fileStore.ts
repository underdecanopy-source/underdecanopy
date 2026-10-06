import { promises as fs } from 'fs';
import { randomUUID } from 'node:crypto';
import path from 'path';

export interface FiledReturnRecord {
    ref: string;
    fileName: string;
    mimeType: string;
    taxType: 'VAT' | 'PIT' | 'WHT' | 'CIT';
    taxId: string;
    tin?: string;
    taxpayerName: string;
    filingPeriod: string;
    createdAt: string;
    verificationHash: string;
    email?: string;
    phone?: string;
    size: number;
}

interface SaveFiledReturnInput {
    record: Omit<FiledReturnRecord, 'size'>;
    fileBuffer: Buffer;
}

function getStoreRoot(): string {
    const isVercel = process.env.VERCEL === '1';
    const basePath = isVercel ? '/tmp' : process.cwd();
    return path.join(basePath, '.smarttax-demo-data', 'filed-returns');
}

function getFilePath(ref: string): string {
    assertValidRef(ref);
    return path.join(getStoreRoot(), `${ref}.pdf`);
}

function getMetadataPath(ref: string): string {
    assertValidRef(ref);
    return path.join(getStoreRoot(), `${ref}.json`);
}

function assertValidRef(ref: string): void {
    if (!/^[A-Za-z0-9_-]{1,100}$/.test(ref)) {
        throw new Error('Invalid filed-return reference.');
    }
}

function isMissingFile(error: unknown): boolean {
    return error instanceof Error && 'code' in error && error.code === 'ENOENT';
}

async function ensureStore(): Promise<void> {
    await fs.mkdir(getStoreRoot(), { recursive: true });
}

export async function saveFiledReturn(input: SaveFiledReturnInput): Promise<FiledReturnRecord> {
    assertValidRef(input.record.ref);
    await ensureStore();
    const filePath = getFilePath(input.record.ref);
    const metadataPath = getMetadataPath(input.record.ref);
    const storedRecord: FiledReturnRecord = {
        ...input.record,
        size: input.fileBuffer.byteLength,
    };

    await fs.writeFile(filePath, input.fileBuffer, { flag: 'wx' });
    await fs.writeFile(metadataPath, JSON.stringify(storedRecord, null, 2), { encoding: 'utf8', flag: 'wx' });

    return storedRecord;
}

export async function getFiledReturnRecord(ref: string): Promise<FiledReturnRecord | null> {
    try {
        assertValidRef(ref);
    } catch {
        return null;
    }

    let raw: string;
    try {
        raw = await fs.readFile(getMetadataPath(ref), 'utf8');
    } catch (error) {
        if (isMissingFile(error)) return null;
        throw error;
    }

    return JSON.parse(raw) as FiledReturnRecord;
}

export async function getFiledReturnFile(ref: string): Promise<Buffer | null> {
    try {
        assertValidRef(ref);
    } catch {
        return null;
    }

    try {
        return await fs.readFile(getFilePath(ref));
    } catch (error) {
        if (isMissingFile(error)) return null;
        throw error;
    }
}
