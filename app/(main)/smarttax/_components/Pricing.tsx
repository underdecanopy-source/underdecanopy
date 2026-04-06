import { Check } from 'lucide-react';

export const Pricing = () => {
    const tiers = [
        {
            name: 'Starter',
            price: 'Free',
            description: 'For individuals and small traders',
            features: [
                'Up to 50 digital receipts per month',
                'Basic tax calculation',
                'Email receipt delivery',
                'Transaction history',
                'Email support',
            ],
            cta: 'Get Started Free',
        },
        {
            name: 'Business',
            price: '₦5,000/mo',
            description: 'For growing businesses',
            features: [
                'Unlimited digital receipts',
                'Full tax return preparation',
                'VAT & withholding tax management',
                'Financial reports & analytics',
                'Receipt delivery via email, SMS & WhatsApp',
                'Priority support',
            ],
            cta: 'Choose Business',
            popular: true,
        },
        {
            name: 'Enterprise',
            price: 'Contact Us',
            description: 'For large organizations',
            features: [
                'Everything in Business',
                'Multi-branch receipt management',
                'Dedicated account manager',
                'Custom tax filing assistance',
                'API access for integration',
                'Staff accounts & role management',
            ],
            cta: 'Contact Sales',
        },
    ];

    return (
        <section className="bg-gray-100 py-20" id="pricing">
            <div className="page-container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800">Pricing Plans</h2>
                    <p className="text-gray-600 mt-2 max-w-3xl mx-auto">Choose a plan that fits your business size and receipt volume. All plans include digital receipt generation and basic tax tracking.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {tiers.map((tier) => (
                        <div key={tier.name} className={`bg-white p-8 rounded-lg shadow-md flex flex-col ${tier.popular ? 'border-2 border-blue-500 relative' : ''}`}>
                            {tier.popular && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full">MOST POPULAR</span>
                            )}
                            <h3 className="text-2xl font-bold text-center mb-2">{tier.name}</h3>
                            <p className="text-sm text-gray-500 text-center mb-4">{tier.description}</p>
                            <p className="text-4xl font-bold text-center mb-8">{tier.price}</p>
                            <ul className="space-y-4 text-gray-600 mb-8 flex-grow">
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex items-start">
                                        <Check className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={18} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <a href="#contact" className={`py-3 px-8 rounded-full text-lg text-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 ${tier.popular ? 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500' : 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-500'}`}>
                                {tier.cta}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
