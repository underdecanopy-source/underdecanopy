import { Check } from 'lucide-react';

export const Pricing = () => {
    const tiers = [
        {
            name: 'Starter',
            price: 'Free',
            features: [
                'Up to 10 invoices per month',
                'Basic reporting',
                'Email support',
            ],
            cta: 'Get Started',
        },
        {
            name: 'Pro',
            price: '$49',
            features: [
                'Unlimited invoices',
                'Advanced reporting',
                'Priority email support',
                'Multi-user support',
            ],
            cta: 'Choose Pro',
        },
        {
            name: 'Enterprise',
            price: 'Contact Us',
            features: [
                'Everything in Pro',
                'Dedicated account manager',
                'Custom integrations',
                '24/7 phone support',
            ],
            cta: 'Contact Sales',
        },
    ];

    return (
        <section className="bg-gray-100 py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Pricing Plans</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {tiers.map((tier) => (
                        <div key={tier.name} className="bg-white p-8 rounded-lg shadow-md flex flex-col">
                            <h3 className="text-2xl font-bold text-center mb-4">{tier.name}</h3>
                            <p className="text-4xl font-bold text-center mb-8">{tier.price}</p>
                            <ul className="space-y-4 text-gray-600 mb-8 flex-grow">
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex items-center">
                                        <Check className="text-green-500 mr-2" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <a href="#" className="bg-blue-500 text-white py-3 px-8 rounded-full text-lg text-center hover:bg-blue-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95">
                                {tier.cta}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};