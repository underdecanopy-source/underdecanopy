export function openPrintableDocument(contentHtml: string, title: string, autoPrint = false): void {
    const style = `
        body { font-family: Inter, system-ui, sans-serif; margin: 0; padding: 24px; color: #111827; background: #fff; }
        .document-shell { max-width: 900px; margin: 0 auto; }
        .document-header { margin-bottom: 24px; }
        .document-header h1 { font-size: 1.5rem; margin: 0; }
        .document-header p { color: #4b5563; margin: 4px 0 0; }
        .card { border: 1px solid #e5e7eb; border-radius: 16px; padding: 18px; margin-bottom: 18px; }
        .field-row { display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
        .field-row span { flex: 1 1 calc(50% - 12px); }
        .field-row strong { display: block; margin-bottom: 6px; }
        .small-text { color: #6b7280; font-size: 0.95rem; }
        .footer-note { margin-top: 28px; font-size: 0.92rem; color: #4b5563; }
        table { width: 100%; border-collapse: collapse; margin-top: 12px; }
        th, td { padding: 12px 10px; border: 1px solid #e5e7eb; text-align: left; }
        th { background: #f9fafb; }
    `;

    const fullHtml = `<!DOCTYPE html><html><head><title>${title}</title><meta charset="utf-8"><style>${style}</style></head><body><div class="document-shell">${contentHtml}</div></body></html>`;

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
            printDocument.write(fullHtml);
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
        }
    } else {
        // For preview, use a Blob URL to avoid about:blank being flagged as deceptive
        const blob = new Blob([fullHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const popup = window.open(url, '_blank', 'noopener,noreferrer,width=900,height=1200');
        if (!popup) {
            window.alert('Unable to open document preview. Please allow pop-ups and try again.');
        } else {
            // Revoke the URL after a delay to free memory while allowing time for the new tab to load
            setTimeout(() => URL.revokeObjectURL(url), 5000);
        }
    }
}
