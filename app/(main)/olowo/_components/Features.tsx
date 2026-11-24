import { Building2, Package, ShoppingCart, Receipt, Calculator, FileText } from 'lucide-react';

export const Features = () => {
    const features = [
        {
            icon: <Building2 size={48} className="text-blue-500" />,
            title: 'Business workspaces',
            description: 'The signed-in workspace supports business setup and owner membership. It requires working authentication and database configuration.',
        },
        {
            icon: <Package size={48} className="text-blue-500" />,
            title: 'Products & inventory',
            description: 'The workspace stores business-scoped products, warehouses and stock movements; on-hand quantities are derived from movement history.',
        },
        {
            icon: <ShoppingCart size={48} className="text-blue-500" />,
            title: 'Completed sales foundation',
            description: 'A completed sale records payment or receivable, stock movements, balanced journal entries, audit history and business events transactionally. Later payments, returns and refunds are not available yet.',
        },
        {
            icon: <Receipt size={48} className="text-blue-500" />,
            title: 'Receipt preview',
            description: 'The separate receipt demo uses browser-local transactions. Its sample receipts are not generated from persisted business sales.',
        },
        {
            icon: <Calculator size={48} className="text-blue-500" />,
            title: 'Tax calculation & document demo',
            description: 'The browser-only demo uses code-defined illustrative tax rules and can prepare draft documents. Rules are not business-configurable or versioned, and returns are not filed.',
        },
        {
            icon: <FileText size={48} className="text-blue-500" />,
            title: 'Other business operations',
            description: 'Purchasing, expenses, payment collection, financial reports, payroll, approvals, document storage, imports, exports and backups are not yet available in the persisted workspace.',
        },
    ];

    return (
        <section className="py-20" id="features">
            <div className="page-container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800">A connected foundation, with more in development</h2>
                    <p className="text-gray-600 mt-2 max-w-3xl mx-auto">The current persisted workspace covers business setup, inventory and completed sales. The receipt and tax preview remains separate browser-local demo data.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature) => (
                        <div key={feature.title} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mx-auto mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
