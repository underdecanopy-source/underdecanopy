import type { Profile, Receipt, Transaction } from './types';
import { buildReceiptShareText as buildReceiptShareTextContent } from './receiptContent';
import { schedulePopupPrint, writePopupDocument } from '@/lib/print/popup';

function cloneDocumentHead(): string {
    const nodes = Array.from(document.head.querySelectorAll('style, link[rel="stylesheet"]'));
    return nodes.map((node) => node.outerHTML).join('\n');
}

export function openReceiptDocument(
    receiptNode: HTMLElement,
    title: string,
    autoPrint = false,
    popupWindow?: Window | null,
) {
    const popup = popupWindow ?? window.open('', '_blank', 'noopener,noreferrer,width=900,height=1200');
    if (!popup) {
        return false;
    }

    const styles = cloneDocumentHead();
    const receiptMarkup = receiptNode.cloneNode(true) as HTMLElement;
    const documentHtml = `
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
                ${receiptMarkup.outerHTML}
            </body>
        </html>
    `;

    writePopupDocument(popup, documentHtml);

    if (autoPrint) {
        schedulePopupPrint(popup);
    }

    return true;
}

export function buildReceiptShareText(profile: Profile, transaction: Transaction, receipt: Receipt): string {
    return buildReceiptShareTextContent(profile, transaction, receipt);
}
