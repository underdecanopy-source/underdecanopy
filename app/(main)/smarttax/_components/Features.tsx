import { Receipt, FileText, Calculator, Shield, BarChart, Clock } from 'lucide-react';

export const Features = () => {
    const features = [
        {
            icon: <Receipt size={48} className="text-blue-500" />,
            title: 'Professional Digital Receipts',
            description: 'Generate branded, professional digital receipts instantly for every transaction. Send receipts via email, SMS, or WhatsApp to your customers with your business name, logo, and transaction details.',
        },
        {
            icon: <FileText size={48} className="text-blue-500" />,
            title: 'Tax Filing & Returns',
            description: 'File your annual tax returns with ease. SmartTax organizes your income, expenses, and deductions, then generates the required forms for NRS and state tax authorities.',
        },
        {
            icon: <Calculator size={48} className="text-blue-500" />,
            title: 'Automated Tax Calculations',
            description: 'SmartTax automatically calculates VAT, withholding tax, and personal income tax based on current Nigerian tax rates. No manual calculations or guesswork needed.',
        },
        {
            icon: <Shield size={48} className="text-blue-500" />,
            title: 'Compliance & Audit-Ready Records',
            description: 'Maintain organized, audit-ready financial records. SmartTax ensures your receipts and tax documents meet NRS requirements, helping you avoid penalties and stay compliant.',
        },
        {
            icon: <BarChart size={48} className="text-blue-500" />,
            title: 'Financial Reports & Analytics',
            description: 'Access detailed reports showing your income trends, tax obligations, and receipt history. Gain insights into your business finances with clear charts and summaries.',
        },
        {
            icon: <Clock size={48} className="text-blue-500" />,
            title: 'Deadline Reminders & Tracking',
            description: 'Never miss a tax filing deadline. SmartTax sends timely reminders for VAT returns, annual tax filings, and other compliance deadlines to keep your business on track.',
        },
    ];

    return (
        <section className="py-20" id="features">
            <div className="page-container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800">Why Choose SmartTax?</h2>
                    <p className="text-gray-600 mt-2 max-w-3xl mx-auto">From issuing receipts to filing tax returns, SmartTax handles the heavy lifting so you can focus on running your business.</p>
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
