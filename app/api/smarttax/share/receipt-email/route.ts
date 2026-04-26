import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { buildReceiptEmailHtml, buildReceiptShareText } from '@/app/(main)/smarttax/demo/_lib/receiptContent';
import { createSmtpTransport, hasSmtpConfig } from '@/lib/mail/smtp';
import { resolveTaxIdentity } from '@/app/(main)/smarttax/demo/_lib/identity';

const profileSchema = z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    businessName: z.string(),
    taxId: z.string(),
    tin: z.string(),
    vatNumber: z.string().optional(),
    address: z.string(),
    state: z.string(),
    businessType: z.enum(['individual', 'sole-proprietor', 'corporate']),
});

const transactionSchema = z.object({
    id: z.string(),
    date: z.string(),
    type: z.enum(['expense', 'revenue']),
    subCategory: z.string().optional(),
    debitCreditFlag: z.enum(['debit', 'credit']),
    customerName: z.string(),
    customerEmail: z.string().email().optional(),
    customerPhone: z.string().optional(),
    customerType: z.enum(['individual', 'company', 'government', 'ngo', 'partnership', 'foreign-entity']),
    description: z.string(),
    amount: z.number(),
    vatable: z.boolean(),
    whtApplicable: z.boolean(),
    vatAmount: z.number(),
    whtAmount: z.number(),
    whtPercentage: z.number(),
    netAmount: z.number(),
    receiptId: z.string(),
    category: z.string().optional(),
    taxYear: z.number(),
    creditNoteGenerated: z.boolean(),
});

const receiptSchema = z.object({
    id: z.string(),
    receiptNumber: z.string(),
    transactionId: z.string(),
    createdAt: z.string(),
    sentViaEmail: z.boolean(),
    sentViaWhatsApp: z.boolean(),
});

const emailSchema = z.object({
    to: z.string().email(),
    profile: profileSchema,
    transaction: transactionSchema,
    receipt: receiptSchema,
});

export async function POST(request: NextRequest) {
    try {
        const body = emailSchema.parse(await request.json());

        if (!hasSmtpConfig()) {
            return NextResponse.json({ error: 'Mail service not configured' }, { status: 503 });
        }

        const transporter = createSmtpTransport();

        const identity = resolveTaxIdentity(body.profile);
        const subject = `Receipt ${body.receipt.receiptNumber} (${identity.primaryLabel}: ${identity.primaryValue})`;
        const text = buildReceiptShareText(body.profile, body.transaction, body.receipt);
        const html = buildReceiptEmailHtml(body.profile, body.transaction, body.receipt);

        await transporter.sendMail({
            from: `"SmartTax Demo" <${process.env.SMTP_USER}>`,
            to: body.to,
            subject,
            text,
            html,
        });

        return NextResponse.json({ message: 'Receipt email sent successfully' }, { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
        }

        console.error('SmartTax receipt email error', error);
        return NextResponse.json({ error: 'Failed to send receipt email' }, { status: 500 });
    }
}
