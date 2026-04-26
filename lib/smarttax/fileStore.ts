import { promises as fs } from 'fs';
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
    return path.join(process.cwd(), '.smarttax-demo-data', 'filed-returns');
}

function getFilePath(ref: string): string {
    return path.join(getStoreRoot(), `${ref}.pdf`);
}

function getMetadataPath(ref: string): string {
    return path.join(getStoreRoot(), `${ref}.json`);
}

async function ensureStore(): Promise<void> {
    await fs.mkdir(getStoreRoot(), { recursive: true });
}

export async function saveFiledReturn(input: SaveFiledReturnInput): Promise<FiledReturnRecord> {
    await ensureStore();
    const filePath = getFilePath(input.record.ref);
    const metadataPath = getMetadataPath(input.record.ref);
    const storedRecord: FiledReturnRecord = {
        ...input.record,
        size: input.fileBuffer.byteLength,
    };

    await fs.writeFile(filePath, input.fileBuffer);
    await fs.writeFile(metadataPath, JSON.stringify(storedRecord, null, 2), 'utf8');

    return storedRecord;
}

export async function getFiledReturnRecord(ref: string): Promise<FiledReturnRecord | null> {
    try {
        const raw = await fs.readFile(getMetadataPath(ref), 'utf8');
        return JSON.parse(raw) as FiledReturnRecord;
    } catch {
        return null;
    }
}

export async function getFiledReturnFile(ref: string): Promise<Buffer | null> {
    try {
        return await fs.readFile(getFilePath(ref));
    } catch {
        return null;
    }
}
