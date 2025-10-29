'use client';

import { useState } from 'react';

export const FAQ = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const faqData = [
        {
            question: 'Is my financial data secure with SmartTax?',
            answer: 'Yes, your data is protected with bank-level encryption and we are fully compliant with all financial regulations.'
        },
        {
            question: 'Can I use SmartTax for my business?',
            answer: 'Absolutely! SmartTax is designed for both individuals and businesses. Our Pro and Enterprise plans offer features specifically for businesses.'
        },
        {
            question: 'What if I need help with my taxes?',
            answer: 'Our Pro and Enterprise plans offer priority support. We also have a team of tax experts who can help you with any questions you may have.'
        },
        {
            question: 'Can I cancel my subscription at any time?',
            answer: 'Yes, you can cancel your subscription at any time. You will still have access to your account until the end of your billing cycle.'
        }
    ];

    return (
        <section className="py-20">
            <div className="container mx-auto px-4 max-w-3xl">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {faqData.map((faq, index) => (
                        <div key={index} className="border rounded-lg overflow-hidden">
                            <button
                                className="w-full flex justify-between items-center p-4 font-semibold text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                                onClick={() => toggleFaq(index)}
                                aria-expanded={openFaq === index}
                                aria-controls={`faq-content-${index}`}
                            >
                                {faq.question}
                                <span
                                    className={`transform transition-transform duration-300 flex-shrink-0 ml-2 ${openFaq === index ? 'rotate-180' : ''}`}
                                    aria-hidden="true"
                                >
                                    ▼
                                </span>
                            </button>
                            <div
                                id={`faq-content-${index}`}
                                className={`grid transition-all duration-300 ease-in-out ${openFaq === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                            >
                                <div className="overflow-hidden">
                                    <div className="p-4 bg-white">
                                        <p className="text-gray-600">{faq.answer}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};