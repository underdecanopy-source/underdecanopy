import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import { saveFiledReturn } from '@/lib/smarttax/fileStore';
import { createSecureDownloadToken } from '@/lib/smarttax/secureLinks';

const filedReturnSchema = z.object({
    fileName: z.string().trim().min(1).max(120).regex(/^[A-Za-z0-9][A-Za-z0-9 ._-]*\.pdf$/i),
    mimeType: z.literal('application/pdf').default('application/pdf'),
    pdfBase64: z.string().min(1).max(14_000_000).regex(/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/),
    metadata: z.object({
        taxType: z.enum(['VAT', 'PIT', 'WHT', 'CIT']),
        taxId: z.string().trim().min(1).max(100),
        tin: z.string().max(100).nullable().optional(),
        taxpayerName: z.string().trim().min(1).max(160),
        filingPeriod: z.string().trim().min(1).max(40),
        createdAt: z.string().datetime(),
        verificationHash: z.string().min(1).max(256),
        email: z.string().email().max(254).nullable().optional().or(z.literal('').nullable().optional()),
        phone: z.string().max(40).nullable().optional(),
    }),
});

export async function POST(request: NextRequest) {
    try {
        const body = filedReturnSchema.parse(await request.json());
        const ref = `OLW-${randomUUID()}`;
        const fileBuffer = Buffer.from(body.pdfBase64, 'base64');
        if (fileBuffer.byteLength === 0 || fileBuffer.byteLength > 10 * 1024 * 1024 || !fileBuffer.subarray(0, 5).equals(Buffer.from('%PDF-'))) {
            return NextResponse.json({ error: 'The uploaded file must be a valid PDF no larger than 10 MB' }, { status: 400 });
        }
        const token = createSecureDownloadToken({ ref, taxId: body.metadata.taxId });
        const record = await saveFiledReturn({
            record: {
                ref,
                fileName: body.fileName,
                mimeType: body.mimeType,
                taxType: body.metadata.taxType,
                taxId: body.metadata.taxId,
                tin: body.metadata.tin || undefined,
                taxpayerName: body.metadata.taxpayerName,
                filingPeriod: body.metadata.filingPeriod,
                createdAt: body.metadata.createdAt,
                verificationHash: body.metadata.verificationHash,
                email: body.metadata.email || undefined,
                phone: body.metadata.phone || undefined,
            },
            fileBuffer,
        });

        const secureLink = `${request.nextUrl.origin}/api/smarttax/download/${ref}?token=${token}`;

        return NextResponse.json(
            {
                record,
                secureLink,
                downloadRef: ref,
            },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
        }

        console.error('SmartTax filed return save error', error);
        return NextResponse.json({ error: 'Failed to save filed return' }, { status: 500 });
    }
}
