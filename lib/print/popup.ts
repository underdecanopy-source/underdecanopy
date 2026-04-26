const PREPARING_DOCUMENT_HTML = '<!DOCTYPE html><html><head><title>Preparing document</title></head><body></body></html>';

export function writePopupDocument(popup: Window, documentHtml: string): void {
    popup.document.open();
    popup.document.write(PREPARING_DOCUMENT_HTML);
    popup.document.close();

    popup.document.open();
    popup.document.write(documentHtml);
    popup.document.close();
}

export function schedulePopupPrint(
    popup: Window,
    options: {
        closeAfterPrint?: boolean;
        delayMs?: number;
        fallbackDelayMs?: number;
    } = {}
): void {
    const { closeAfterPrint = false, delayMs = 250, fallbackDelayMs = 1_000 } = options;
    let scheduled = false;

    const runPrint = () => {
        if (scheduled) {
            return;
        }
        scheduled = true;
        window.setTimeout(() => {
            popup.focus();
            popup.print();
            if (closeAfterPrint) {
                popup.close();
            }
        }, delayMs);
    };

    if (popup.document.readyState === 'complete') {
        runPrint();
        return;
    }

    if (typeof popup.addEventListener === 'function') {
        popup.addEventListener('load', runPrint, { once: true });
    }

    window.setTimeout(runPrint, fallbackDelayMs);
}
