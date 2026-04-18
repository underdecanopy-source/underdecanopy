export const VAT_RATE = 0.075;
export const VAT_THRESHOLD = 25_000_000;

export const WHT_RATES = {
    individual: 0.05,
    corporate: 0.10,
    rent: 0.10,
    interest: 0.10,
} as const;

export const PIT_BRACKETS = [
    { min: 0, max: 300_000, rate: 0.07, label: '7% on first ₦300,000' },
    { min: 300_001, max: 600_000, rate: 0.11, label: '11% on next ₦300,000' },
    { min: 600_001, max: 1_100_000, rate: 0.15, label: '15% on next ₦500,000' },
    { min: 1_100_001, max: 1_600_000, rate: 0.19, label: '19% on next ₦500,000' },
    { min: 1_600_001, max: 3_200_000, rate: 0.21, label: '21% on next ₦1,600,000' },
    { min: 3_200_001, max: Infinity, rate: 0.24, label: '24% above ₦3,200,000' },
] as const;

export type CustomerType = 'individual' | 'corporate' | 'non-taxable';

export interface TaxCalculationResult {
    vatAmount: number;
    whtAmount: number;
    netAmount: number;
    totalTax: number;
}

export interface TaxCalculationInput {
    amount: number;
    customerType?: CustomerType;
    vatable?: boolean;
    whtApplicable?: boolean;
}

export function calculateTransactionTax(input: TaxCalculationInput | number, legacyCustomerType?: CustomerType): TaxCalculationResult {
    const opts: TaxCalculationInput = typeof input === 'number' ? { amount: input, customerType: legacyCustomerType } : input;
    const amount = opts.amount;
    const customerType: CustomerType = opts.customerType ?? 'individual';
    const nonTaxable = customerType === 'non-taxable';
    const vatable = nonTaxable ? false : opts.vatable ?? true;
    const whtApplicable = nonTaxable ? false : opts.whtApplicable ?? true;

    const vatAmount = vatable ? amount * VAT_RATE : 0;
    const whtRate = customerType === 'corporate' ? WHT_RATES.corporate : WHT_RATES.individual;
    const whtAmount = whtApplicable ? amount * whtRate : 0;
    const netAmount = amount + vatAmount - whtAmount;

    return {
        vatAmount,
        whtAmount,
        netAmount,
        totalTax: vatAmount + whtAmount,
    };
}

export function calculatePersonalIncomeTax(annualIncome: number): {
    tax: number;
    effectiveRate: number;
    bracketBreakdown: Array<{ label: string; taxedAmount: number; tax: number }>;
} {
    let remaining = annualIncome;
    let totalTax = 0;
    const bracketBreakdown: Array<{ label: string; taxedAmount: number; tax: number }> = [];

    for (const bracket of PIT_BRACKETS) {
        if (remaining <= 0) break;
        const span = bracket.max - bracket.min + 1;
        const taxedAmount = Math.min(remaining, span);
        const tax = taxedAmount * bracket.rate;
        totalTax += tax;
        remaining -= taxedAmount;
        if (taxedAmount > 0) {
            bracketBreakdown.push({ label: bracket.label, taxedAmount, tax });
        }
    }

    return {
        tax: totalTax,
        effectiveRate: annualIncome > 0 ? (totalTax / annualIncome) * 100 : 0,
        bracketBreakdown,
    };
}

export function formatNaira(value: number): string {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value || 0);
}

export function formatAmountInput(raw: string): string {
    if (!raw) return '';
    const cleaned = raw.replace(/[^0-9.]/g, '');
    const firstDot = cleaned.indexOf('.');
    const normalized =
        firstDot === -1
            ? cleaned
            : cleaned.slice(0, firstDot + 1) + cleaned.slice(firstDot + 1).replace(/\./g, '');
    const [intPart, decPart] = normalized.split('.');
    const intWithCommas = intPart ? Number(intPart).toLocaleString('en-US') : '';
    if (decPart === undefined) return intWithCommas;
    return `${intWithCommas || '0'}.${decPart.slice(0, 2)}`;
}

export function parseAmountInput(formatted: string): number {
    if (!formatted) return 0;
    const n = parseFloat(formatted.replace(/,/g, ''));
    return Number.isFinite(n) ? n : 0;
}
