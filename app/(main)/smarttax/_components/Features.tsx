import { Shield, BarChart, Users } from 'lucide-react';

export const Features = () => {
    const features = [
        {
            icon: <Shield size={48} className="text-blue-500" />,
            title: 'Bank-Grade Security',
            description: 'Your data is protected with the same security standards as a bank.',
        },
        {
            icon: <BarChart size={48} className="text-blue-500" />,
            title: 'Detailed Analytics',
            description: 'Get a clear overview of your tax situation with our detailed analytics.',
        },
        {
            icon: <Users size={48} className="text-blue-500" />,
            title: 'Multi-User Support',
            description: 'Collaborate with your team or family members on your tax returns.',
        },
    ];

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose SmartTax?</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature) => (
                        <div key={feature.title} className="bg-white p-6 rounded-lg shadow-md text-center">
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