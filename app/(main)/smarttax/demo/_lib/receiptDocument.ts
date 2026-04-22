import { formatNaira } from './taxCalculator';
import type { Profile, Receipt, Transaction } from './types';
import { getTransactionLabel } from './financials';

function cloneDocumentHead(): string {
    const nodes = Array.from(document.head.querySelectorAll('style, link[rel="stylesheet"]'));
    return nodes.map((node) => node.outerHTML).join('\n');
}

export function openReceiptDocument(receiptNode: HTMLElement, title: string, autoPrint = false) {
    const popup = window.open('', '_blank', 'noopener,noreferrer,width=900,height=1200');
    if (!popup) {
        return false;
    }

    const styles = cloneDocumentHead();
    popup.document.open();
    popup.document.write(`
        <!doctype html>
        <html>
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>${title}</title>
                ${styles}
                <style>
                    body { margin: 0; padding: 24px; background: #f8fafc; }
                    #receipt-print-area { max-width: 760px; margin: 0 auto; }
                    @media print {
                        body { padding: 0; background: #fff; }
                        #receipt-print-area { max-width: none; }
                    }
                </style>
            </head>
            <body>
                ${receiptNode.outerHTML}
            </body>
        </html>
    `);
    popup.document.close();

    if (autoPrint) {
        popup.onload = () => {
            popup.focus();
            popup.print();
        };
    }

    return true;
}

export function buildReceiptShareText(profile: Profile, transaction: Transaction, receipt: Receipt): string {
    const lines = [
        `${profile.businessName || profile.name} Receipt`,
        `Receipt No: ${receipt.receiptNumber}`,
        `Date: ${new Date(receipt.createdAt).toLocaleString('en-NG')}`,
        `Counterparty: ${transaction.customerName}`,
        `Transaction Type: ${transaction.type === 'revenue' ? 'Revenue (Credit)' : 'Expense (Debit)'}`,
        `Category: ${getTransactionLabel(transaction)}`,
        `Description: ${transaction.description}`,
        `Subtotal: ${formatNaira(transaction.amount)}`,
        `VAT: ${transaction.vatable ? formatNaira(transaction.vatAmount) : 'Not applied'}`,
        `WHT: ${transaction.whtApplicable ? formatNaira(transaction.whtAmount) : 'Not deducted'}`,
        `${transaction.type === 'revenue' ? 'Net Amount Received' : 'Net Cash Outflow'}: ${formatNaira(transaction.netAmount)}`,
    ];

    return lines.join('\n');
}
