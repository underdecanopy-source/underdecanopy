import { buildReceiptEmailHtml } from '../receiptContent';
import { formatNaira } from '../taxCalculator';

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

const receipt = {
    id: 'rcpt_1',
    receiptNumber: 'STX-2026-10000',
    transactionId: 'txn_1',
    createdAt: '2026-04-25T10:00:00.000Z',
    sentViaEmail: false,
    sentViaWhatsApp: false,
};

const transaction = {
    id: 'txn_1',
    date: '2026-04-25T10:00:00.000Z',
    type: 'revenue' as const,
    subCategory: 'Service Income',
    debitCreditFlag: 'credit' as const,
    customerName: 'Chidinma Okafor',
    customerEmail: 'chidinma@example.ng',
    customerPhone: '+2348031112233',
    customerType: 'individual' as const,
    description: 'Strategy consulting',
    amount: 750000,
    vatable: false,
    whtApplicable: false,
    vatAmount: 0,
    whtAmount: 0,
    whtPercentage: 0,
    netAmount: 750000,
    receiptId: 'rcpt_1',
    category: 'Consulting',
    taxYear: 2026,
    creditNoteGenerated: false,
};

describe('buildReceiptEmailHtml', () => {
    it('omits VAT and WHT sections when they do not apply', () => {
        const html = buildReceiptEmailHtml(profile, transaction, receipt);

        expect(html).toContain('Tax ID:</strong> STX-DEMO-TAX-1001');
        expect(html).toContain(formatNaira(transaction.amount));
        expect(html).not.toContain('VAT (7.5%)');
        expect(html).not.toContain('WHT Credit');
        expect(html).not.toContain('WHT Credit Note');
    });

    it('shows only applicable VAT or WHT sections', () => {
        const html = buildReceiptEmailHtml(
            profile,
            {
                ...transaction,
                type: 'expense',
                debitCreditFlag: 'debit',
                vatable: false,
                whtApplicable: true,
                whtAmount: 37500,
                whtPercentage: 5,
                netAmount: 712500,
            },
            receipt
        );

        expect(html).not.toContain('VAT (7.5%)');
        expect(html).toContain('WHT Credit');
        expect(html).toContain('WHT Credit Note');
    });
});
