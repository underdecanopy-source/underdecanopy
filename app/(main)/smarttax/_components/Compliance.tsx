import { ShieldCheck, FileCheck, Scale } from 'lucide-react';

export const Compliance = () => {
    return (
        <section className="py-20 bg-gray-50" id="compliance">
            <div className="page-container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Tax Compliance & Security</h2>
                    <p className="text-gray-600 max-w-3xl mx-auto">SmartTax ensures your business meets all Nigerian tax regulations while keeping your financial data secure.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <ShieldCheck className="text-blue-500 mx-auto mb-4" size={48} />
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Data Protection</h3>
                        <p className="text-gray-600">Your financial data is encrypted at rest and in transit. We use industry-standard security practices to protect your receipts, transactions, and tax records from unauthorized access.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <FileCheck className="text-blue-500 mx-auto mb-4" size={48} />
                        <h3 className="text-xl font-bold text-gray-800 mb-3">FIRS Compliance</h3>
                        <p className="text-gray-600">SmartTax-generated receipts and tax returns conform to the Federal Inland Revenue Service requirements. Stay compliant with Companies Income Tax, VAT, and Personal Income Tax regulations.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <Scale className="text-blue-500 mx-auto mb-4" size={48} />
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Audit-Ready Records</h3>
                        <p className="text-gray-600">All your receipt and transaction records are stored in an organized, searchable format. In the event of a tax audit, you can produce complete documentation quickly and easily.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
