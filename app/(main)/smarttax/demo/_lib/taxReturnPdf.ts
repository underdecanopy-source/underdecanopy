'use client';

import jsPDF from 'jspdf';
import { formatNaira } from './taxCalculator';
import type { TaxReturnDocumentData } from './taxReturnDocument';

function writeLine(doc: jsPDF, text: string, x: number, y: number, maxWidth = 170): number {
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y);
    return y + lines.length * 6;
}

function addSectionTitle(doc: jsPDF, title: string, y: number): number {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text(title, 20, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    return y + 7;
}

function ensurePage(doc: jsPDF, y: number, requiredSpace = 18): number {
    if (y <= 270 - requiredSpace) {
        return y;
    }
    doc.addPage();
    return 20;
}

export async function generateTaxReturnPdfBlob(document: TaxReturnDocumentData): Promise<Blob> {
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    let y = 20;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    y = writeLine(doc, document.title, 20, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    y = writeLine(doc, `Prepared on ${new Date(document.generatedAt).toLocaleString('en-NG')}`, 20, y + 2);

    y += 6;
    y = addSectionTitle(doc, 'Taxpayer Identity', y);
    y = writeLine(doc, `${document.identity.primaryLabel}: ${document.identity.primaryValue || 'Missing'}`, 20, y);
    if (document.identity.secondaryValue) {
        y = writeLine(doc, `${document.identity.secondaryLabel}: ${document.identity.secondaryValue}`, 20, y);
    }
    y = writeLine(doc, `Name: ${document.taxpayerName}`, 20, y);
    y = writeLine(doc, `Business Type: ${document.businessType.replace('-', ' ')}`, 20, y);
    y = writeLine(doc, `Filing Year: ${document.filingYear}`, 20, y);

    y += 4;
    y = ensurePage(doc, y);
    y = addSectionTitle(doc, `${document.taxType} Return Summary`, y);
    [
        ['Filing Period', document.filingPeriod],
        ['Total Income', formatNaira(document.totalIncome)],
        ['VAT Credit', formatNaira(document.totalVatCredit)],
        ['WHT Credit', formatNaira(document.totalWhtCredit)],
        ['Tax Payable', formatNaira(document.taxPayable)],
    ].forEach(([label, value]) => {
        y = writeLine(doc, `${label}: ${value}`, 20, y);
    });

    y += 4;
    y = ensurePage(doc, y);
    y = addSectionTitle(doc, 'Computation Details', y);

    const computationRows =
        document.computation.kind === 'period'
            ? [
                  ['Transaction Count', String(document.computation.transactionCount)],
                  ['Total Income', formatNaira(document.computation.totalIncome)],
                  ['VAT Credit', formatNaira(document.computation.totalVatCredit)],
                  ['WHT Credit', formatNaira(document.computation.totalWhtCredit)],
                  ['Tax Payable', formatNaira(document.computation.taxPayable)],
              ]
            : document.computation.kind === 'pit'
              ? [
                    ['Gross Annual Income', formatNaira(document.computation.grossAnnualIncome)],
                    ['Statutory Deductions', formatNaira(document.computation.totalDeductions)],
                    ['CRA Applied', document.computation.useRelief ? formatNaira(document.computation.cra) : 'Not applied'],
                    ['Taxable Income', formatNaira(document.computation.taxableIncome)],
                    ['Tax Payable', formatNaira(document.computation.totalTax)],
                    ['Effective Rate', `${document.computation.effectiveRate.toFixed(2)}%`],
                ]
              : [
                    ['Turnover', formatNaira(document.computation.turnover)],
                    ['Accounting Profit', formatNaira(document.computation.accountingProfit)],
                    ['Disallowable Expenses', formatNaira(document.computation.disallowableExpenses)],
                    ['Capital Allowances', formatNaira(document.computation.capitalAllowances)],
                    ['Taxable Profit', formatNaira(document.computation.taxableProfit)],
                    ['Base CIT', formatNaira(document.computation.tax)],
                    ['WHT Credits', formatNaira(document.computation.whtCredits)],
                    ['Final Tax Payable', formatNaira(document.computation.finalTax)],
                ];

    computationRows.forEach(([label, value]) => {
        y = ensurePage(doc, y);
        y = writeLine(doc, `${label}: ${value}`, 20, y);
    });

    if (document.computation.kind === 'pit' && document.computation.breakdown.length > 0) {
        y += 4;
        y = ensurePage(doc, y, 30);
        y = addSectionTitle(doc, 'Progressive PIT Breakdown', y);
        document.computation.breakdown.forEach((item) => {
            y = ensurePage(doc, y);
            y = writeLine(
                doc,
                `${item.label} | Taxable: ${formatNaira(item.taxableAmount)} | Rate: ${(item.rate * 100).toFixed(0)}% | Tax: ${formatNaira(item.tax)}`,
                20,
                y
            );
        });
    }

    y += 6;
    y = ensurePage(doc, y, 24);
    y = addSectionTitle(doc, 'Verification', y);
    y = writeLine(doc, 'This document is electronically generated and valid without signature.', 20, y);
    y = writeLine(doc, `Verification ID: ${document.verificationHash}`, 20, y);

    return doc.output('blob');
}

export function downloadBlob(blob: Blob, fileName: string): void {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1_000);
}

export async function blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const dataUrl = reader.result as string;
            const base64 = dataUrl.split(',')[1] || '';
            resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}
