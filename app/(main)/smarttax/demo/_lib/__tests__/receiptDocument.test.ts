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

    it('writes only the provided receipt markup into an iframe and triggers print', () => {
        const receiptNode = document.createElement('div');
        receiptNode.id = 'receipt-print-area';
        receiptNode.innerHTML = '<p>Receipt Only</p>';

        const mockIframe = document.createElement('iframe');
        const mockWindow = {
            document: {
                open: jest.fn(),
                write: jest.fn(),
                close: jest.fn(),
            },
            focus: jest.fn(),
            print: jest.fn(),
        };
        Object.defineProperty(mockIframe, 'contentWindow', {
            value: mockWindow,
            configurable: true,
        });

        const originalCreateElement = document.createElement.bind(document);
        jest.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
            if (tagName === 'iframe') return mockIframe;
            return originalCreateElement(tagName as never);
        });

        const result = openReceiptDocument(receiptNode, 'Receipt Test', true);

        expect(result).toBe(true);
        expect(mockWindow.document.write).toHaveBeenCalledWith(expect.stringContaining(receiptNode.outerHTML));

        jest.advanceTimersByTime(251);

        expect(mockWindow.focus).toHaveBeenCalled();
        expect(mockWindow.print).toHaveBeenCalled();
    });

    it('opens receipt preview with a blob URL instead of about:blank', () => {
        const receiptNode = document.createElement('div');
        receiptNode.id = 'receipt-print-area';
        receiptNode.innerHTML = '<p>Receipt Preview</p>';

        const objectUrl = 'blob:http://localhost/receipt-preview';
        const createObjectURL = jest.fn().mockReturnValue(objectUrl);
        const revokeObjectURL = jest.fn();
        Object.defineProperty(URL, 'createObjectURL', {
            value: createObjectURL,
            configurable: true,
            writable: true,
        });
        Object.defineProperty(URL, 'revokeObjectURL', {
            value: revokeObjectURL,
            configurable: true,
            writable: true,
        });
        const openSpy = jest.spyOn(window, 'open').mockReturnValue({} as Window);

        const result = openReceiptDocument(receiptNode, 'Receipt Preview');

        expect(result).toBe(true);
        expect(createObjectURL).toHaveBeenCalled();
        expect(openSpy).toHaveBeenCalledWith(
            objectUrl,
            '_blank',
            'noopener,noreferrer,width=900,height=1200'
        );

        jest.advanceTimersByTime(5001);

        expect(revokeObjectURL).toHaveBeenCalledWith(objectUrl);
    });
});
