import { openPrintableDocument } from '../openDocument';

describe('openPrintableDocument', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
        jest.restoreAllMocks();
    });

    it('writes the document into an iframe and triggers print for autoPrint mode', () => {
        const mockIframe = document.createElement('iframe');
        const mockWindow = {
            document: {
                open: jest.fn(),
                write: jest.fn(),
                close: jest.fn(),
            },
            focus: jest.fn(),
            print: jest.fn(),
        };
        Object.defineProperty(mockIframe, 'contentWindow', {
            value: mockWindow,
            configurable: true,
        });

        const originalCreateElement = document.createElement.bind(document);
        jest.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
            if (tagName === 'iframe') return mockIframe;
            return originalCreateElement(tagName as never);
        });

        openPrintableDocument('<div>Report body</div>', 'Report Test', true);

        expect(mockWindow.document.write).toHaveBeenCalledWith(
            expect.stringContaining('<div>Report body</div>')
        );

        jest.advanceTimersByTime(251);

        expect(mockWindow.focus).toHaveBeenCalled();
        expect(mockWindow.print).toHaveBeenCalled();
    });

    it('opens a blob URL instead of about:blank for preview mode', () => {
        const objectUrl = 'blob:http://localhost/report-preview';
        const createObjectURL = jest.fn().mockReturnValue(objectUrl);
        const revokeObjectURL = jest.fn();
        Object.defineProperty(URL, 'createObjectURL', {
            value: createObjectURL,
            configurable: true,
            writable: true,
        });
        Object.defineProperty(URL, 'revokeObjectURL', {
            value: revokeObjectURL,
            configurable: true,
            writable: true,
        });
        const openSpy = jest.spyOn(window, 'open').mockReturnValue({} as Window);

        openPrintableDocument('<div>Preview body</div>', 'Preview Test');

        expect(createObjectURL).toHaveBeenCalled();
        expect(openSpy).toHaveBeenCalledWith(
            objectUrl,
            '_blank',
            'noopener,noreferrer,width=900,height=1200'
        );

        jest.advanceTimersByTime(5001);

        expect(revokeObjectURL).toHaveBeenCalledWith(objectUrl);
    });
});
