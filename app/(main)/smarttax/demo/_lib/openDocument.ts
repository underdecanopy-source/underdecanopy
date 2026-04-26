import { schedulePopupPrint, writePopupDocument } from '@/lib/print/popup';

export function openPrintableDocument(contentHtml: string, title: string, autoPrint = false): void {
    const popup = window.open('', '_blank', 'noopener,noreferrer,width=900,height=1200');
    if (!popup) {
        window.alert('Unable to open document preview. Please allow pop-ups and try again.');
        return;
    }

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

    writePopupDocument(
        popup,
        `<!DOCTYPE html><html><head><title>${title}</title><meta charset="utf-8"><style>${style}</style></head><body><div class="document-shell">${contentHtml}</div></body></html>`
    );

    if (autoPrint) {
        schedulePopupPrint(popup);
    }
}
