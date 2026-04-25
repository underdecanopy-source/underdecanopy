import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Utility for printing HTML content in a new window.
 * Prevents 'about:blank' issues by ensuring content is written before printing.
 */
export const printContent = (htmlContent: string) => {
  // Opening about:blank explicitly before writing
  const printWindow = window.open('about:blank', '_blank', 'width=800,height=600');
  
  if (!printWindow) {
    alert('Please allow pop-ups to print your document.');
    return;
  }

  // Setup event listeners BEFORE writing content to avoid race conditions
  printWindow.onload = () => {
    printWindow.focus();
    printWindow.print();
  };

  printWindow.document.write(`
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
  printWindow.document.close();
  
  // Fallback for browsers that don't trigger onload for document.write
  setTimeout(() => {
    if (printWindow && printWindow.document.readyState === 'complete') {
      printWindow.focus();
      printWindow.print();
    }
  }, 500);

  printWindow.onafterprint = () => printWindow.close();
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