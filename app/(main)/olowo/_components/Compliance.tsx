import { ShieldCheck, FileCheck, Database } from 'lucide-react';

export const Compliance = () => {
    return (
        <section className="py-20 bg-gray-50" id="compliance">
            <div className="page-container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Current preview boundaries</h2>
                    <p className="text-gray-600 max-w-3xl mx-auto">These notes describe the implemented preview only; they are not a claim of full production readiness, tax compliance or a completed security review.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <ShieldCheck className="text-blue-500 mx-auto mb-4" size={48} />
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Business workspace access</h3>
                        <p className="text-gray-600">The current business APIs check the signed-in user and business membership server-side. This is a limited foundation, not a complete security review or production-readiness guarantee.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <FileCheck className="text-blue-500 mx-auto mb-4" size={48} />
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Tax document preview</h3>
                        <p className="text-gray-600">The browser-only demo can prepare draft tax documents from demo records. It is not connected to persisted business sales and does not submit returns to tax authorities.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <Database className="text-blue-500 mx-auto mb-4" size={48} />
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Demo data storage</h3>
                        <p className="text-gray-600">Demo transactions, receipts, reminders and return records use browser storage. Draft PDFs are generated locally in the current flow; neither is tenant-scoped document storage or a complete audit archive.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
