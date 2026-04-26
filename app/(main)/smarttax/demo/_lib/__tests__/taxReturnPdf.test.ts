export {};
const { TextDecoder, TextEncoder } = require('util');

Object.assign(globalThis, { TextEncoder, TextDecoder });

const { buildTaxReturnDocumentData, buildTaxReturnDocumentHtml } = require('../taxReturnDocument');
const { generateTaxReturnPdfBlob } = require('../taxReturnPdf');

const profile = {
    name: 'Demo User',
    email: 'demo@smarttax.ng',
    phone: '+2348000000000',
    businessName: 'SmartTax Demo Business',
    taxId: 'STX-DEMO-TAX-1001',
    tin: '12345678-0001',
    address: '1 Demo Street, Lagos',
    state: 'Lagos',
    businessType: 'sole-proprietor' as const,
};

describe('tax return document output', () => {
    it('keeps Tax ID in the HTML document and generates a non-empty PDF blob', async () => {
        const document = buildTaxReturnDocumentData({
            profile,
            title: 'PIT Return 2026',
            taxType: 'PIT',
            filingPeriod: '2026',
            filingYear: '2026',
            generatedAt: '2026-04-25T10:00:00.000Z',
            verificationHash: 'abc123hash',
            totalIncome: 12000000,
            totalVatCredit: 0,
            totalWhtCredit: 0,
            taxPayable: 1518000,
            computation: {
                kind: 'pit',
                grossAnnualIncome: 12000000,
                pension: 0,
                nhf: 0,
                nhis: 0,
                totalDeductions: 0,
                useRelief: true,
                cra: 2400000,
                taxableIncome: 9600000,
                totalTax: 1518000,
                effectiveRate: 12.65,
                breakdown: [
                    { label: '0% on first NGN 800,000', taxableAmount: 800000, rate: 0, tax: 0 },
                    { label: '15% on next NGN 2,200,000', taxableAmount: 2200000, rate: 0.15, tax: 330000 },
                    { label: '18% on next NGN 9,000,000', taxableAmount: 6600000, rate: 0.18, tax: 1188000 },
                ],
                dueDate: '2027-03-31T00:00:00.000Z',
            },
        });

        const html = buildTaxReturnDocumentHtml(document);
        expect(html).toContain('<strong>Tax ID:</strong> STX-DEMO-TAX-1001');
        expect(html).toContain('Verification ID:</strong> abc123hash');

        const pdfBlob = await generateTaxReturnPdfBlob(document);
        expect(pdfBlob.size).toBeGreaterThan(1000);
        expect(pdfBlob.type).toBe('application/pdf');
    });
});
