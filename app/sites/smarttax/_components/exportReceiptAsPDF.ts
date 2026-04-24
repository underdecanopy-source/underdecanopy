// Legacy helper kept for compatibility with older SmartTax pages.
// The current demo uses an isolated receipt window and the browser print dialog
// so users can save the receipt as PDF without third-party dependencies.
function cloneDocumentHead(): string {
  const nodes = Array.from(document.head.querySelectorAll('style, link[rel="stylesheet"]'));
  return nodes.map((node) => node.outerHTML).join('\n');
}

export function exportReceiptAsPDF(receiptNode: HTMLElement, fileName = 'receipt.pdf') {
  if (!receiptNode || typeof window === 'undefined') return false;

  const popup = window.open('', '_blank', 'noopener,noreferrer,width=900,height=1200');
  if (!popup) {
    console.warn('PDF export popup was blocked by the browser.');
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
        <title>${fileName}</title>
        ${styles}
        <style>
          body { margin: 0; padding: 24px; background: #f8fafc; }
          #receipt-print-area { max-width: 760px; margin: 0 auto; }
          @media print { body { padding: 0; background: #fff; } }
          @media print { #receipt-print-area { max-width: none; } }
        </style>
      </head>
      <body>${receiptNode.outerHTML}</body>
    </html>
  `);
  popup.document.close();
  popup.onload = () => {
    popup.focus();
    popup.print();
  };

  return true;
}
