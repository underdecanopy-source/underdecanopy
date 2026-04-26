import { requireTaxIdentity, resolveTaxIdentity } from '../identity';
import { calculateCIT, calculatePIT } from '../taxCalculator';

describe('resolveTaxIdentity', () => {
    it('prefers Tax ID and preserves TIN as secondary when both exist', () => {
        expect(resolveTaxIdentity({ taxId: 'NRS-24001', tin: '12345678-0001' })).toEqual({
            primaryLabel: 'Tax ID',
            primaryValue: 'NRS-24001',
            secondaryLabel: 'TIN',
            secondaryValue: '12345678-0001',
            source: 'tax-id',
        });
    });

    it('falls back to TIN when Tax ID is not set', () => {
        expect(resolveTaxIdentity({ taxId: '', tin: '12345678-0001' })).toEqual({
            primaryLabel: 'Tax ID',
            primaryValue: '12345678-0001',
            secondaryLabel: null,
            secondaryValue: null,
            source: 'tin-fallback',
        });
    });

    it('throws when both Tax ID and TIN are missing', () => {
        expect(() => requireTaxIdentity({ taxId: '', tin: '' })).toThrow(
            'Missing Tax ID or TIN. Update SmartTax settings before generating a receipt or return.'
        );
    });
});

describe('calculatePIT', () => {
    it('applies CRA and the configured Nigerian PIT bands', () => {
        const result = calculatePIT({ grossAnnualIncome: 12_000_000 });

        expect(result.cra).toBe(2_400_000);
        expect(result.taxableIncome).toBe(9_600_000);
        expect(result.totalTax).toBe(1_518_000);
        expect(result.breakdown).toHaveLength(3);
    });

    it('supports demo mode without relief', () => {
        const result = calculatePIT({ grossAnnualIncome: 12_000_000, useRelief: false });

        expect(result.cra).toBe(0);
        expect(result.taxableIncome).toBe(12_000_000);
        expect(result.totalTax).toBe(1_950_000);
    });
});

describe('calculateCIT', () => {
    it('returns zero tax for small companies at or below the turnover threshold', () => {
        const result = calculateCIT({
            turnover: 100_000_000,
            accountingProfit: 18_000_000,
            disallowableExpenses: 1_000_000,
            capitalAllowances: 500_000,
            whtCredits: 250_000,
        });

        expect(result.companyCategory).toBe('small');
        expect(result.tax).toBe(0);
        expect(result.finalTax).toBe(0);
    });

    it('applies 30% CIT and subtracts WHT credits for medium and large companies', () => {
        const result = calculateCIT({
            turnover: 180_000_000,
            accountingProfit: 50_000_000,
            disallowableExpenses: 2_000_000,
            capitalAllowances: 4_000_000,
            whtCredits: 3_000_000,
        });

        expect(result.companyCategory).toBe('medium-large');
        expect(result.taxableProfit).toBe(48_000_000);
        expect(result.tax).toBe(14_400_000);
        expect(result.finalTax).toBe(11_400_000);
    });
});
