// Legacy helper kept for compatibility with older SmartTax pages.
// The current demo uses an isolated receipt window and the browser print dialog
// so users can save the receipt as PDF without third-party dependencies.
function cloneDocumentHead(): string {
  const nodes = Array.from(document.head.querySelectorAll('style, link[rel="stylesheet"]'));
  return nodes.map((node) => node.outerHTML).join('\n');
}

export function exportReceiptAsPDF(receiptNode: HTMLElement, fileName = 'receipt.pdf') {
  if (!receiptNode || typeof window === 'undefined') return false;

  const styles = cloneDocumentHead();
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
      printDocument.write(`
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
}
