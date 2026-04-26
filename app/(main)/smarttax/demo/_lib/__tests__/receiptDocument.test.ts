import { buildReceiptShareText, openReceiptDocument } from '../receiptDocument';

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

describe('buildReceiptShareText', () => {
    it('omits VAT and WHT lines when they do not apply and formats currency in Naira', () => {
        const text = buildReceiptShareText(profile, transaction, receipt);

        expect(text).toContain('Tax ID: STX-DEMO-TAX-1001');
        expect(text).toContain('Subtotal: ₦750,000.00');
        expect(text).toContain('Net Amount to Credit: ₦750,000.00');
        expect(text).not.toContain('VAT (7.5%)');
        expect(text).not.toContain('WHT Credit');
    });
});

describe('openReceiptDocument', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        document.head.innerHTML = '<style>.demo { color: red; }</style>';
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
        document.head.innerHTML = '';
    });

    it('writes only the provided receipt markup into the popup and triggers print', () => {
        const receiptNode = document.createElement('div');
        receiptNode.id = 'receipt-print-area';
        receiptNode.innerHTML = '<p>Receipt Only</p>';

        const writes: string[] = [];
        const popup = {
            document: {
                readyState: 'complete',
                open: jest.fn(),
                write: jest.fn((html: string) => {
                    writes.push(html);
                }),
                close: jest.fn(),
            },
            focus: jest.fn(),
            print: jest.fn(),
        } as unknown as Window;

        const result = openReceiptDocument(receiptNode, 'Receipt Test', true, popup);

        expect(result).toBe(true);
        expect(writes[writes.length - 1]).toContain(receiptNode.outerHTML);
        expect(writes[writes.length - 1]).not.toContain('<body><div id="root">');

        jest.advanceTimersByTime(251);

        expect(popup.focus).toHaveBeenCalled();
        expect(popup.print).toHaveBeenCalled();
    });
});
