import { ShieldCheck } from 'lucide-react';

export const Compliance = () => {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <ShieldCheck className="text-blue-500 mx-auto mb-4" size={64} />
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Compliance & Security</h2>
                    <p className="text-gray-600 mb-8">
                        At SmartTax, we take the security of your financial data very seriously. We are fully compliant with all major financial regulations, including GDPR and CCPA. Your data is encrypted in transit and at rest, and we use multi-factor authentication to protect your account.
                    </p>
                    <a href="#" className="text-blue-500 hover:underline">Learn more about our security practices</a>
                </div>
            </div>
        </section>
    );
};