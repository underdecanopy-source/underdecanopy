import { getTransactionLabel } from './financials';
import { resolveTaxIdentity } from './identity';
import { formatNaira } from './taxCalculator';
import type { Profile, Receipt, Transaction } from './types';

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

export function buildReceiptShareText(profile: Profile, transaction: Transaction, receipt: Receipt): string {
    const identity = resolveTaxIdentity(profile);
    const lines = [
        `${profile.businessName || profile.name} Receipt`,
        `Receipt No: ${receipt.receiptNumber}`,
        `Date: ${new Date(receipt.createdAt).toLocaleString('en-NG')}`,
        `${identity.primaryLabel}: ${identity.primaryValue || 'Missing'}`,
        ...(identity.secondaryValue ? [`${identity.secondaryLabel}: ${identity.secondaryValue}`] : []),
        `Counterparty: ${transaction.customerName}`,
        `Transaction Type: ${transaction.type === 'revenue' ? 'Revenue (Credit)' : 'Expense (Debit)'}`,
        `Category: ${getTransactionLabel(transaction)}`,
        `Description: ${transaction.description}`,
        `Subtotal: ${formatNaira(transaction.amount)}`,
        ...(transaction.vatable ? [`VAT (7.5%): ${formatNaira(transaction.vatAmount)}`] : []),
        ...(transaction.whtApplicable ? [`WHT Credit: ${formatNaira(transaction.whtAmount)}`] : []),
        `${transaction.type === 'revenue' ? 'Net Amount to Credit' : 'Net Amount Going Out'}: ${formatNaira(transaction.netAmount)}`,
    ];

    return lines.join('\n');
}

export function buildReceiptEmailHtml(profile: Profile, transaction: Transaction, receipt: Receipt): string {
    const identity = resolveTaxIdentity(profile);
    const businessName = escapeHtml(profile.businessName || profile.name || 'SmartTax Business');
    const counterpartyLabel = transaction.type === 'revenue' ? 'Billed To' : 'Paid To';
    const transactionLabel = escapeHtml(getTransactionLabel(transaction));
    const receiptNumber = escapeHtml(receipt.receiptNumber);
    const dateLabel = escapeHtml(new Date(receipt.createdAt).toLocaleString('en-NG'));
    const customerName = escapeHtml(transaction.customerName || '-');
    const customerEmail = transaction.customerEmail ? `<p>${escapeHtml(transaction.customerEmail)}</p>` : '';
    const customerPhone = transaction.customerPhone ? `<p>${escapeHtml(transaction.customerPhone)}</p>` : '';
    const secondaryIdentity = identity.secondaryValue
        ? `<p><strong>${escapeHtml(identity.secondaryLabel || 'TIN')}:</strong> ${escapeHtml(identity.secondaryValue)}</p>`
        : '';
    const vatRow = transaction.vatable
        ? `
            <div class="summary-row">
                <span>VAT (7.5%)</span>
                <span class="vat">+ ${escapeHtml(formatNaira(transaction.vatAmount))}</span>
            </div>
        `
        : '';
    const whtRow = transaction.whtApplicable
        ? `
            <div class="summary-row">
                <span>WHT Credit</span>
                <span class="wht">- ${escapeHtml(formatNaira(transaction.whtAmount))}</span>
            </div>
        `
        : '';
    const whtNote =
        transaction.type === 'expense' && transaction.whtApplicable
            ? `
                <div class="note">
                    <strong>WHT Credit Note:</strong> ${escapeHtml(formatNaira(transaction.whtAmount))} has been withheld and will be remitted to the relevant tax authority on your behalf.
                </div>
            `
            : '';

    return `
        <html>
            <head>
                <meta charset="utf-8" />
                <style>
                    body { font-family: Arial, sans-serif; background: #f8fafc; color: #0f172a; padding: 24px; }
                    .receipt { max-width: 720px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; }
                    .header { display: flex; justify-content: space-between; gap: 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 16px; margin-bottom: 16px; }
                    .identity p, .counterparty p { margin: 4px 0; }
                    .muted { color: #475569; font-size: 12px; }
                    .badge { display: inline-block; background: #e2e8f0; border-radius: 9999px; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; margin-right: 8px; }
                    .badge.revenue { background: #d1fae5; color: #065f46; }
                    .badge.expense { background: #fef3c7; color: #92400e; }
                    .badge.credit { background: #dbeafe; color: #1d4ed8; }
                    .badge.debit { background: #ffe4e6; color: #be123c; }
                    table { width: 100%; border-collapse: collapse; margin: 16px 0; }
                    th, td { text-align: left; padding: 10px 0; border-bottom: 1px solid #e2e8f0; }
                    th:last-child, td:last-child { text-align: right; }
                    .summary-row { display: flex; justify-content: space-between; gap: 16px; margin: 6px 0; }
                    .vat { color: #c2410c; }
                    .wht { color: #be123c; }
                    .total { border-top: 1px solid #e2e8f0; margin-top: 12px; padding-top: 12px; font-size: 18px; font-weight: 700; }
                    .note { margin-top: 16px; padding: 12px; background: #fff1f2; border: 1px solid #fecdd3; border-radius: 8px; font-size: 12px; color: #9f1239; }
                </style>
            </head>
            <body>
                <div class="receipt">
                    <div class="header">
                        <div>
                            <h1 style="margin: 0 0 8px;">${businessName}</h1>
                            <div class="identity muted">
                                <p><strong>${escapeHtml(identity.primaryLabel)}:</strong> ${escapeHtml(identity.primaryValue || 'Missing')}</p>
                                ${secondaryIdentity}
                                ${profile.email ? `<p>${escapeHtml(profile.email)}</p>` : ''}
                                ${profile.phone ? `<p>${escapeHtml(profile.phone)}</p>` : ''}
                            </div>
                        </div>
                        <div class="muted" style="text-align: right;">
                            <p style="margin: 0 0 8px; font-weight: 700; text-transform: uppercase;">Receipt</p>
                            <p style="margin: 0 0 4px; font-family: monospace;">${receiptNumber}</p>
                            <p style="margin: 0;">${dateLabel}</p>
                        </div>
                    </div>

                    <div style="margin-bottom: 16px;">
                        <span class="badge ${transaction.type === 'revenue' ? 'revenue' : 'expense'}">${escapeHtml(transaction.type)}</span>
                        <span class="badge ${transaction.debitCreditFlag === 'credit' ? 'credit' : 'debit'}">${escapeHtml(transaction.debitCreditFlag)}</span>
                        <span class="badge">${transactionLabel}</span>
                    </div>

                    <div class="counterparty" style="display: flex; justify-content: space-between; gap: 16px;">
                        <div>
                            <p class="muted" style="font-weight: 700; text-transform: uppercase;">${escapeHtml(counterpartyLabel)}</p>
                            <p style="margin: 4px 0; font-weight: 700;">${customerName}</p>
                            ${customerEmail}
                            ${customerPhone}
                        </div>
                        <div style="text-align: right;">
                            <p class="muted" style="font-weight: 700; text-transform: uppercase;">Classification</p>
                            <p style="margin: 4px 0; font-weight: 700;">${transactionLabel}</p>
                            <p class="muted" style="margin: 4px 0;">Counterparty: ${escapeHtml(transaction.customerType.replace('-', ' '))}</p>
                        </div>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>${escapeHtml(transaction.description || '-')}</td>
                                <td>${escapeHtml(formatNaira(transaction.amount))}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="summary-row">
                        <span>Subtotal</span>
                        <span>${escapeHtml(formatNaira(transaction.amount))}</span>
                    </div>
                    ${vatRow}
                    ${whtRow}
                    <div class="summary-row total">
                        <span>${escapeHtml(transaction.type === 'revenue' ? 'Net Amount to Credit' : 'Net Amount Going Out')}</span>
                        <span>${escapeHtml(formatNaira(transaction.netAmount))}</span>
                    </div>
                    ${whtNote}
                </div>
            </body>
        </html>
    `;
}
