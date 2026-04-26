import type { CustomerType } from './types';

export const VAT_RATE = 0.075;
export const VAT_THRESHOLD = 25_000_000;

export const WHT_RATES = {
    Rent: { individual: 0.1, corporate: 0.1 },
    Royalties: { individual: 0.05, corporate: 0.1 },
    Consulting: { individual: 0.05, corporate: 0.1 },
    Sales: { individual: 0.05, corporate: 0.05 },
    Construction: { individual: 0.05, corporate: 0.05 },
    Dividends: { individual: 0.1, corporate: 0.1 },
    'Directors Fees': { individual: 0.1, corporate: 0.1 },
    Services: { individual: 0.05, corporate: 0.1 },
    Other: { individual: 0.05, corporate: 0.1 },
} as const;

export const PIT_BANDS = [
    { limit: 800_000, rate: 0, label: '0% on first NGN 800,000' },
    { limit: 2_200_000, rate: 0.15, label: '15% on next NGN 2,200,000' },
    { limit: 9_000_000, rate: 0.18, label: '18% on next NGN 9,000,000' },
    { limit: 13_000_000, rate: 0.21, label: '21% on next NGN 13,000,000' },
    { limit: 25_000_000, rate: 0.23, label: '23% on next NGN 25,000,000' },
    { limit: Number.POSITIVE_INFINITY, rate: 0.25, label: '25% above NGN 50,000,000' },
] as const;

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
    whtPercentage?: number;
    category?: string;
    transactionType?: 'expense' | 'revenue';
}

export interface PitCalculationInput {
    grossAnnualIncome: number;
    pension?: number;
    nhf?: number;
    nhis?: number;
    useRelief?: boolean;
}

export interface PitCalculationResult {
    grossAnnualIncome: number;
    pension: number;
    nhf: number;
    nhis: number;
    totalDeductions: number;
    useRelief: boolean;
    cra: number;
    taxableIncome: number;
    totalTax: number;
    effectiveRate: number;
    breakdown: Array<{ label: string; taxableAmount: number; rate: number; tax: number }>;
}

export interface CitCalculationInput {
    turnover: number;
    accountingProfit: number;
    disallowableExpenses?: number;
    capitalAllowances?: number;
    whtCredits?: number;
}

export interface CitCalculationResult {
    turnover: number;
    accountingProfit: number;
    disallowableExpenses: number;
    capitalAllowances: number;
    whtCredits: number;
    taxableProfit: number;
    tax: number;
    finalTax: number;
    effectiveRate: number;
    companyCategory: 'small' | 'medium-large';
}

function normalizeAmount(value?: number): number {
    return Number.isFinite(value) ? Math.max(0, Number(value)) : 0;
}

function roundCurrency(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function calculateTransactionTax(
    input: TaxCalculationInput | number,
    legacyCustomerType?: CustomerType
): TaxCalculationResult {
    const opts: TaxCalculationInput =
        typeof input === 'number' ? { amount: input, customerType: legacyCustomerType } : input;
    const amount = opts.amount;
    const customerType: CustomerType = opts.customerType ?? 'individual';
    void customerType;
    const transactionType = opts.transactionType ?? 'revenue';
    const vatable = transactionType === 'revenue' ? opts.vatable ?? true : false;
    const whtApplicable = transactionType === 'expense' ? opts.whtApplicable ?? false : false;

    const vatAmount = vatable ? amount * VAT_RATE : 0;
    const whtPercentage = opts.whtPercentage ?? 0;
    const whtAmount = whtApplicable ? amount * (whtPercentage / 100) : 0;
    const netAmount = transactionType === 'expense' ? amount - whtAmount : amount + vatAmount;

    return {
        vatAmount,
        whtAmount,
        netAmount,
        totalTax: vatAmount + whtAmount,
    };
}

export function calculatePIT(input: PitCalculationInput): PitCalculationResult {
    const grossAnnualIncome = normalizeAmount(input.grossAnnualIncome);
    const pension = normalizeAmount(input.pension);
    const nhf = normalizeAmount(input.nhf);
    const nhis = normalizeAmount(input.nhis);
    const useRelief = input.useRelief ?? true;
    const totalDeductions = pension + nhf + nhis;
    const taxableBase = Math.max(0, grossAnnualIncome - totalDeductions);
    const cra = useRelief ? Math.max(200_000, 0.2 * grossAnnualIncome) : 0;
    let remaining = Math.max(0, taxableBase - cra);
    let totalTax = 0;
    const breakdown: PitCalculationResult['breakdown'] = [];

    for (const band of PIT_BANDS) {
        if (remaining <= 0) break;
        const taxableAmount = Math.min(remaining, band.limit);
        const tax = taxableAmount * band.rate;
        totalTax += tax;
        remaining -= taxableAmount;
        if (taxableAmount > 0) {
            breakdown.push({
                label: band.label,
                taxableAmount: roundCurrency(taxableAmount),
                rate: band.rate,
                tax: roundCurrency(tax),
            });
        }
    }

    const taxableIncome = Math.max(0, taxableBase - cra);

    return {
        grossAnnualIncome: roundCurrency(grossAnnualIncome),
        pension: roundCurrency(pension),
        nhf: roundCurrency(nhf),
        nhis: roundCurrency(nhis),
        totalDeductions: roundCurrency(totalDeductions),
        useRelief,
        cra: roundCurrency(cra),
        taxableIncome: roundCurrency(taxableIncome),
        totalTax: roundCurrency(totalTax),
        effectiveRate: grossAnnualIncome > 0 ? roundCurrency((totalTax / grossAnnualIncome) * 100) : 0,
        breakdown,
    };
}

export function calculateCIT(input: CitCalculationInput): CitCalculationResult {
    const turnover = normalizeAmount(input.turnover);
    const accountingProfit = normalizeAmount(input.accountingProfit);
    const disallowableExpenses = normalizeAmount(input.disallowableExpenses);
    const capitalAllowances = normalizeAmount(input.capitalAllowances);
    const whtCredits = normalizeAmount(input.whtCredits);
    const taxableProfit = Math.max(0, accountingProfit + disallowableExpenses - capitalAllowances);

    if (turnover <= 100_000_000) {
        return {
            turnover: roundCurrency(turnover),
            accountingProfit: roundCurrency(accountingProfit),
            disallowableExpenses: roundCurrency(disallowableExpenses),
            capitalAllowances: roundCurrency(capitalAllowances),
            whtCredits: roundCurrency(whtCredits),
            taxableProfit: roundCurrency(taxableProfit),
            tax: 0,
            finalTax: 0,
            effectiveRate: 0,
            companyCategory: 'small',
        };
    }

    const tax = taxableProfit * 0.3;
    const finalTax = Math.max(0, tax - whtCredits);

    return {
        turnover: roundCurrency(turnover),
        accountingProfit: roundCurrency(accountingProfit),
        disallowableExpenses: roundCurrency(disallowableExpenses),
        capitalAllowances: roundCurrency(capitalAllowances),
        whtCredits: roundCurrency(whtCredits),
        taxableProfit: roundCurrency(taxableProfit),
        tax: roundCurrency(tax),
        finalTax: roundCurrency(finalTax),
        effectiveRate: taxableProfit > 0 ? roundCurrency((finalTax / taxableProfit) * 100) : 0,
        companyCategory: 'medium-large',
    };
}

export function calculatePersonalIncomeTax(
    annualIncome: number,
    options: Omit<PitCalculationInput, 'grossAnnualIncome'> = {}
): {
    tax: number;
    taxableIncome: number;
    cra: number;
    totalDeductions: number;
    effectiveRate: number;
    bracketBreakdown: Array<{ label: string; taxedAmount: number; tax: number; rate: number }>;
} {
    const pit = calculatePIT({ grossAnnualIncome: annualIncome, ...options });
    return {
        tax: pit.totalTax,
        taxableIncome: pit.taxableIncome,
        cra: pit.cra,
        totalDeductions: pit.totalDeductions,
        effectiveRate: pit.effectiveRate,
        bracketBreakdown: pit.breakdown.map((item) => ({
            label: item.label,
            taxedAmount: item.taxableAmount,
            tax: item.tax,
            rate: item.rate,
        })),
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
