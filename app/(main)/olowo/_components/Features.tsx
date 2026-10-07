import { Receipt, FileText, Calculator, Shield, BarChart, Clock } from 'lucide-react';

export const Features = () => {
    const features = [
        {
            icon: <Receipt size={48} className="text-blue-500" />,
            title: 'Professional Digital Receipts',
            description: 'Preview branded digital receipts from demo transactions. The current demo stores records in this browser; it is not a durable cloud archive.',
        },
        {
            icon: <FileText size={48} className="text-blue-500" />,
            title: 'Tax Records & Return Preparation',
            description: 'The current demo organizes income and expenses and prepares tax returns for review. It does not submit filings to tax authorities.',
        },
        {
            icon: <Calculator size={48} className="text-blue-500" />,
            title: 'Automated Tax Calculations',
            description: 'Olowo calculates VAT, withholding tax, and personal income tax based on the tax rates configured for your business.',
        },
        {
            icon: <Shield size={48} className="text-blue-500" />,
            title: 'Organized Demo Records',
            description: 'Explore how receipt and tax information is organized in the current preview. These browser-local records are not a complete audit archive.',
        },
        {
            icon: <BarChart size={48} className="text-blue-500" />,
            title: 'Financial Reports & Analytics',
            description: 'Explore summary reports generated from demo transactions. These figures are not connected to your business workspaces or production financial records.',
        },
        {
            icon: <Clock size={48} className="text-blue-500" />,
            title: 'Deadline Reminders & Tracking',
            description: 'Keep track of VAT returns, annual tax filings, and other compliance deadlines with Olowo.',
        },
    ];

    return (
        <section className="py-20" id="features">
            <div className="page-container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800">Connected business operations, all in Olowo</h2>
                    <p className="text-gray-600 mt-2 max-w-3xl mx-auto">Olowo is the Business OS for SMEs, bringing digital receipts and tax workflows into the wider platform.</p>
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
