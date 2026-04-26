import type { Profile, Receipt, Transaction } from './types';
import { buildReceiptShareText as buildReceiptShareTextContent } from './receiptContent';

function cloneDocumentHead(): string {
    const nodes = Array.from(document.head.querySelectorAll('style, link[rel="stylesheet"]'));
    return nodes.map((node) => node.outerHTML).join('\n');
}

export function openReceiptDocument(
    receiptNode: HTMLElement,
    title: string,
    autoPrint = false,
) {
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

    if (autoPrint) {
        const iframe = document.createElement('iframe');
        iframe.style.position = 'fixed';
        iframe.style.right = '0';
        iframe.style.bottom = '0';
        iframe.style.width = '0';
        iframe.style.height = '0';
        iframe.style.border = '0';
        document.body.appendChild(iframe);

        const printDocument = iframe.contentWindow?.document;
        if (printDocument) {
            printDocument.open();
            printDocument.write(documentHtml);
            printDocument.close();

            setTimeout(() => {
                iframe.contentWindow?.focus();
                iframe.contentWindow?.print();
                
                setTimeout(() => {
                    if (document.body.contains(iframe)) {
                        document.body.removeChild(iframe);
                    }
                }, 1000);
            }, 250);
            return true;
        }
        return false;
    } else {
        const blob = new Blob([documentHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const popup = window.open(url, '_blank', 'noopener,noreferrer,width=900,height=1200');
        if (!popup) {
            return false;
        }
        setTimeout(() => URL.revokeObjectURL(url), 5000);
        return true;
    }
}

export function buildReceiptShareText(profile: Profile, transaction: Transaction, receipt: Receipt): string {
    return buildReceiptShareTextContent(profile, transaction, receipt);
}
