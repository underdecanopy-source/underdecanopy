import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Utility for printing HTML content in a new window.
 * Prevents 'about:blank' issues by ensuring content is written before printing.
 */
export const printContent = (htmlContent: string) => {
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
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print Document</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
            @media print {
              body { margin: 0; }
              .no-print { display: none; }
            }
            .receipt { border: 1px solid #eee; padding: 20px; max-width: 500px; margin: auto; }
            .flex { display: flex; justify-content: space-between; margin-bottom: 8px; }
            .font-bold { font-weight: bold; }
          </style>
        </head>
        <body>${htmlContent}</body>
      </html>
    `);
    printDocument.close();

    // Focus and print after a short delay to ensure rendering
    setTimeout(() => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
      
      // Remove iframe after printing dialog closes (or when it regains focus)
      setTimeout(() => {
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }, 1000);
    }, 250);
  }
};

/**
 * Generates a PDF from a DOM element using html2canvas and jsPDF.
 */
export const generatePDF = async (elementId: string, filename = 'document.pdf') => {
  const element = document.getElementById(elementId);
  if (!element) return;
  const canvas = await html2canvas(element, { scale: 2 });
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const imgWidth = 210;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  pdf.save(filename);
};
