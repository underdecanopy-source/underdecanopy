import type { Profile, TaxReturnComputation, TaxReturn } from './types';
import type { ResolvedTaxIdentity } from './identity';
import { resolveTaxIdentity } from './identity';
import { formatNaira } from './taxCalculator';

export interface TaxReturnDocumentData {
    title: string;
    taxType: TaxReturn['returnType'];
    filingPeriod: string;
    filingYear: string;
    taxpayerName: string;
    identity: ResolvedTaxIdentity;
    businessType: Profile['businessType'];
    generatedAt: string;
    verificationHash: string;
    totalIncome: number;
    totalVatCredit: number;
    totalWhtCredit: number;
    taxPayable: number;
    computation: TaxReturnComputation;
}

export function buildTaxReturnDocumentData(input: {
    profile: Profile;
    title: string;
    taxType: TaxReturn['returnType'];
    filingPeriod: string;
    filingYear: string;
    generatedAt: string;
    verificationHash: string;
    totalIncome: number;
    totalVatCredit: number;
    totalWhtCredit: number;
    taxPayable: number;
    computation: TaxReturnComputation;
}): TaxReturnDocumentData {
    return {
        title: input.title,
        taxType: input.taxType,
        filingPeriod: input.filingPeriod,
        filingYear: input.filingYear,
        taxpayerName: input.profile.businessName || input.profile.name,
        identity: resolveTaxIdentity(input.profile),
        businessType: input.profile.businessType,
        generatedAt: input.generatedAt,
        verificationHash: input.verificationHash,
        totalIncome: input.totalIncome,
        totalVatCredit: input.totalVatCredit,
        totalWhtCredit: input.totalWhtCredit,
        taxPayable: input.taxPayable,
        computation: input.computation,
    };
}

function buildComputationRows(document: TaxReturnDocumentData): Array<[string, string]> {
    const computation = document.computation;

    if (computation.kind === 'period') {
        return [
            ['Transaction Count', String(computation.transactionCount)],
            ['Total Income', formatNaira(computation.totalIncome)],
            ['VAT Credit', formatNaira(computation.totalVatCredit)],
            ['WHT Credit', formatNaira(computation.totalWhtCredit)],
            ['Tax Payable', formatNaira(computation.taxPayable)],
            ['Due Date', new Date(computation.dueDate).toLocaleDateString('en-NG')],
        ];
    }

    if (computation.kind === 'pit') {
        return [
            ['Gross Annual Income', formatNaira(computation.grossAnnualIncome)],
            ['Statutory Deductions', formatNaira(computation.totalDeductions)],
            ['CRA Applied', computation.useRelief ? formatNaira(computation.cra) : 'Not applied'],
            ['Taxable Income', formatNaira(computation.taxableIncome)],
            ['Tax Payable', formatNaira(computation.totalTax)],
            ['Effective Rate', `${computation.effectiveRate.toFixed(2)}%`],
            ['Due Date', new Date(computation.dueDate).toLocaleDateString('en-NG')],
        ];
    }

    return [
        ['Turnover', formatNaira(computation.turnover)],
        ['Accounting Profit', formatNaira(computation.accountingProfit)],
        ['Disallowable Expenses', formatNaira(computation.disallowableExpenses)],
        ['Capital Allowances', formatNaira(computation.capitalAllowances)],
        ['Taxable Profit', formatNaira(computation.taxableProfit)],
        ['Base CIT', formatNaira(computation.tax)],
        ['WHT Credits', formatNaira(computation.whtCredits)],
        ['Final Tax Payable', formatNaira(computation.finalTax)],
        ['Company Category', computation.companyCategory === 'small' ? 'Small Company' : 'Medium / Large Company'],
        ['Due Date', new Date(computation.dueDate).toLocaleDateString('en-NG')],
    ];
}

function buildPITBreakdownHtml(document: TaxReturnDocumentData): string {
    if (document.computation.kind !== 'pit' || document.computation.breakdown.length === 0) {
        return '';
    }

    return `
        <div class="card">
            <h2>Progressive PIT Breakdown</h2>
            <table>
                <thead>
                    <tr>
                        <th>Band</th>
                        <th>Taxable Amount</th>
                        <th>Rate</th>
                        <th>Tax</th>
                    </tr>
                </thead>
                <tbody>
                    ${document.computation.breakdown
                        .map(
                            (item) => `
                            <tr>
                                <td>${item.label}</td>
                                <td>${formatNaira(item.taxableAmount)}</td>
                                <td>${(item.rate * 100).toFixed(0)}%</td>
                                <td>${formatNaira(item.tax)}</td>
                            </tr>
                        `
                        )
                        .join('')}
                </tbody>
            </table>
        </div>
    `;
}

export function buildTaxReturnDocumentHtml(document: TaxReturnDocumentData): string {
    const identityRows = [
        `<p><strong>${document.identity.primaryLabel}:</strong> ${document.identity.primaryValue || 'Missing'}</p>`,
        document.identity.secondaryValue
            ? `<p><strong>${document.identity.secondaryLabel}:</strong> ${document.identity.secondaryValue}</p>`
            : '',
        `<p><strong>Name:</strong> ${document.taxpayerName}</p>`,
        `<p><strong>Business Type:</strong> ${document.businessType.replace('-', ' ')}</p>`,
        `<p><strong>Filing Year:</strong> ${document.filingYear}</p>`,
    ]
        .filter(Boolean)
        .join('');

    const computationRows = buildComputationRows(document)
        .map(
            ([label, value]) => `
                <tr>
                    <th>${label}</th>
                    <td>${value}</td>
                </tr>
            `
        )
        .join('');

    return `
        <div class="tax-return">
            <div class="document-header">
                <h1>${document.title}</h1>
                <p class="small-text">Prepared on ${new Date(document.generatedAt).toLocaleString('en-NG')}</p>
            </div>

            <div class="card identity">
                <h2>Taxpayer Identity</h2>
                ${identityRows}
            </div>

            <div class="card">
                <h2>${document.taxType} Return Summary</h2>
                <table>
                    <tbody>
                        <tr>
                            <th>Filing Period</th>
                            <td>${document.filingPeriod}</td>
                        </tr>
                        <tr>
                            <th>Total Income</th>
                            <td>${formatNaira(document.totalIncome)}</td>
                        </tr>
                        <tr>
                            <th>VAT Credit</th>
                            <td>${formatNaira(document.totalVatCredit)}</td>
                        </tr>
                        <tr>
                            <th>WHT Credit</th>
                            <td>${formatNaira(document.totalWhtCredit)}</td>
                        </tr>
                        <tr>
                            <th>Tax Payable</th>
                            <td>${formatNaira(document.taxPayable)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="card">
                <h2>Computation Details</h2>
                <table>
                    <tbody>
                        ${computationRows}
                    </tbody>
                </table>
            </div>

            ${buildPITBreakdownHtml(document)}

            <div class="footer-note">
                <p>This document is electronically generated and valid without signature.</p>
                <p><strong>Verification ID:</strong> ${document.verificationHash}</p>
            </div>
        </div>
    `;
}

export function buildTaxReturnShareMessage(document: TaxReturnDocumentData, secureLink: string): string {
    const lines = [
        `SmartTax ${document.taxType} Return`,
        `${document.identity.primaryLabel}: ${document.identity.primaryValue || 'Missing'}`,
        `Taxpayer: ${document.taxpayerName}`,
        `Filing Period: ${document.filingPeriod}`,
        `Tax Payable: ${formatNaira(document.taxPayable)}`,
        `Verification ID: ${document.verificationHash}`,
        `Download: ${secureLink}`,
    ];

    if (document.identity.secondaryValue) {
        lines.splice(2, 0, `${document.identity.secondaryLabel}: ${document.identity.secondaryValue}`);
    }

    return lines.join('\n');
}
