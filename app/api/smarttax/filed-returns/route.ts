import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { saveFiledReturn } from '@/lib/smarttax/fileStore';
import { createSecureDownloadToken } from '@/lib/smarttax/secureLinks';

const filedReturnSchema = z.object({
    ref: z.string().min(1).optional(),
    fileName: z.string().min(1),
    mimeType: z.string().min(1).default('application/pdf'),
    pdfBase64: z.string().min(1),
    metadata: z.object({
        taxType: z.enum(['VAT', 'PIT', 'WHT', 'CIT']),
        taxId: z.string().min(1),
        tin: z.string().optional(),
        taxpayerName: z.string().min(1),
        filingPeriod: z.string().min(1),
        createdAt: z.string().min(1),
        verificationHash: z.string().min(1),
        email: z.string().email().optional().or(z.literal('')),
        phone: z.string().optional(),
    }),
});

export async function POST(request: NextRequest) {
    try {
        const body = filedReturnSchema.parse(await request.json());
        const ref = body.ref || `STX-${Date.now()}`;
        const fileBuffer = Buffer.from(body.pdfBase64, 'base64');
        const record = await saveFiledReturn({
            record: {
                ref,
                fileName: body.fileName,
                mimeType: body.mimeType,
                taxType: body.metadata.taxType,
                taxId: body.metadata.taxId,
                tin: body.metadata.tin,
                taxpayerName: body.metadata.taxpayerName,
                filingPeriod: body.metadata.filingPeriod,
                createdAt: body.metadata.createdAt,
                verificationHash: body.metadata.verificationHash,
                email: body.metadata.email || undefined,
                phone: body.metadata.phone || undefined,
            },
            fileBuffer,
        });

        const token = createSecureDownloadToken({ ref, taxId: body.metadata.taxId });
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
