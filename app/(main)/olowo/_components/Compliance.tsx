import { ShieldCheck, FileCheck, Scale } from 'lucide-react';

export const Compliance = () => {
    return (
        <section className="py-20 bg-gray-50" id="compliance">
            <div className="page-container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Tax Compliance & Security</h2>
                    <p className="text-gray-600 max-w-3xl mx-auto">Olowo supports Nigerian tax and record-keeping workflows as part of a connected platform for your business.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <ShieldCheck className="text-blue-500 mx-auto mb-4" size={48} />
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Data Protection</h3>
                        <p className="text-gray-600">Olowo is being designed with security, access control, and auditability as platform requirements. Production security controls must be verified before being represented as active.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <FileCheck className="text-blue-500 mx-auto mb-4" size={48} />
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Tax Record-Keeping</h3>
                        <p className="text-gray-600">The current preview helps organize receipt and tax records for review. It does not connect to or submit returns to tax authorities.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <Scale className="text-blue-500 mx-auto mb-4" size={48} />
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Demo Record Storage</h3>
                        <p className="text-gray-600">Demo records are stored in this browser only. They are not a durable, searchable cloud archive or a complete audit record.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
