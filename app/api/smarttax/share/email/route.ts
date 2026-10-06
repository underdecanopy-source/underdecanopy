import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getFiledReturnFile, getFiledReturnRecord } from '@/lib/smarttax/fileStore';
import { createSmtpTransport, hasSmtpConfig } from '@/lib/mail/smtp';
import { verifySecureDownloadToken } from '@/lib/smarttax/secureLinks';

const emailSchema = z.object({
    ref: z.string().regex(/^[A-Za-z0-9_-]{1,100}$/),
    to: z.string().email().max(254),
    taxId: z.string().min(1).max(100),
    secureLink: z.string().url(),
    subject: z.string().max(200).optional(),
});

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

export async function POST(request: NextRequest) {
    try {
        const body = emailSchema.parse(await request.json());

        if (!hasSmtpConfig()) {
            return NextResponse.json({ error: 'Mail service not configured' }, { status: 503 });
        }

        const downloadUrl = new URL(body.secureLink);
        if (
            downloadUrl.origin !== request.nextUrl.origin ||
            downloadUrl.pathname !== `/api/smarttax/download/${body.ref}`
        ) {
            return NextResponse.json({ error: 'Invalid download link' }, { status: 400 });
        }

        const token = verifySecureDownloadToken(downloadUrl.searchParams.get('token') || '');
        if (!token || token.ref !== body.ref || token.taxId !== body.taxId) {
            return NextResponse.json({ error: 'Invalid or expired download token' }, { status: 403 });
        }

        const [record, fileBuffer] = await Promise.all([
            getFiledReturnRecord(body.ref),
            getFiledReturnFile(body.ref),
        ]);

        if (!record || !fileBuffer) {
            return NextResponse.json({ error: 'Filed return not found' }, { status: 404 });
        }

        if (record.taxId !== token.taxId) {
            return NextResponse.json({ error: 'Download token does not match the stored Tax ID' }, { status: 403 });
        }

        const transporter = createSmtpTransport();

        const safeTaxId = escapeHtml(body.taxId);
        const safeName = escapeHtml(record.taxpayerName);
        const safeLink = escapeHtml(body.secureLink);
        const subject = body.subject || `Your Tax Return (Tax ID: ${body.taxId})`;

        await transporter.sendMail({
            from: `"Olowo" <${process.env.SMTP_USER}>`,
            to: body.to,
            subject,
            text: `Tax ID: ${body.taxId}\nTaxpayer: ${record.taxpayerName}\nDownload your filed return: ${body.secureLink}`,
            html: `<p><strong>Tax ID:</strong> ${safeTaxId}</p><p><strong>Taxpayer:</strong> ${safeName}</p><p>Your filed return is attached. You can also download it here: <a href="${safeLink}">${safeLink}</a></p>`,
            attachments: [{ filename: record.fileName, content: fileBuffer }],
        });

        return NextResponse.json({ message: 'Return email sent successfully' }, { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
        }

        console.error('SmartTax email share error', error);
        return NextResponse.json({ error: 'Failed to send return email' }, { status: 500 });
    }
}
