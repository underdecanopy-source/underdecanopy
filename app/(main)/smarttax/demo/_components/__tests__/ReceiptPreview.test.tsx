import { render, screen } from '@testing-library/react';
import { ReceiptPreview } from '../ReceiptPreview';

const baseProfile = {
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

const baseData = {
    customerName: 'Chidinma Okafor',
    customerEmail: 'chidinma@example.ng',
    customerPhone: '+2348031112233',
    customerType: 'individual' as const,
    description: 'Strategy consulting',
    category: 'Consulting',
    amount: 750000,
    vatable: false,
    whtApplicable: false,
    vatAmount: 0,
    whtAmount: 0,
    whtPercentage: 0,
    netAmount: 750000,
    receiptNumber: 'STX-2026-10000',
    createdAt: '2026-04-25T10:00:00.000Z',
    transactionType: 'revenue' as const,
    subCategory: 'Service Income',
    debitCreditFlag: 'credit' as const,
    creditNoteGenerated: false,
};

describe('ReceiptPreview', () => {
    it('hides VAT and WHT rows when they do not apply', () => {
        render(<ReceiptPreview profile={baseProfile} data={baseData} variant="final" />);

        expect(screen.queryByText('VAT (7.5%)')).not.toBeInTheDocument();
        expect(screen.queryByText('WHT Credit')).not.toBeInTheDocument();
        expect(screen.getByText('Net Amount to Credit')).toBeInTheDocument();
        expect(screen.getAllByText('₦750,000.00').length).toBeGreaterThan(0);
    });

    it('shows only the applicable tax rows', () => {
        render(
            <ReceiptPreview
                profile={baseProfile}
                data={{
                    ...baseData,
                    vatable: true,
                    vatAmount: 56250,
                    netAmount: 806250,
                }}
                variant="final"
            />
        );

        expect(screen.getByText('VAT (7.5%)')).toBeInTheDocument();
        expect(screen.queryByText('WHT Credit')).not.toBeInTheDocument();
        expect(screen.getByText((_, element) => element?.textContent === '+ ₦56,250.00')).toBeInTheDocument();
    });
});
