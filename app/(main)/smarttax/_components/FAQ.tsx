'use client';

import { useState } from 'react';

export const FAQ = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const faqData = [
        {
            question: 'What types of receipts can I generate with SmartTax?',
            answer: 'SmartTax supports sales receipts, service invoices, payment confirmations, and VAT receipts. Each receipt includes your business name, customer details, itemized list of products or services, tax breakdown, and a unique receipt number for tracking.'
        },
        {
            question: 'How does SmartTax help with tax filing?',
            answer: 'SmartTax tracks all your transactions throughout the year, automatically calculates your tax obligations (including VAT, withholding tax, and personal/company income tax), and prepares the necessary forms for filing with FIRS or your state tax authority. You review and submit the prepared returns.'
        },
        {
            question: 'Can I send receipts directly to my customers?',
            answer: 'Yes. SmartTax lets you send professional digital receipts to customers via email, SMS, or WhatsApp instantly after a transaction. Customers receive a branded receipt with all transaction details and can access it anytime.'
        },
        {
            question: 'Is SmartTax suitable for my type of business?',
            answer: 'SmartTax is designed for sole proprietors, small and medium businesses, freelancers, and enterprises across all industries. Whether you run a retail shop, offer professional services, or manage multiple branches, SmartTax adapts to your needs.'
        },
        {
            question: 'How do I get my tax records if I am audited?',
            answer: 'All your receipts, transactions, and tax filings are stored securely and can be exported as PDF or CSV files at any time. SmartTax maintains a complete audit trail that shows every transaction, receipt issued, and tax payment made.'
        },
        {
            question: 'What tax rates does SmartTax use?',
            answer: 'SmartTax uses current Nigerian tax rates as specified by FIRS, including the 7.5% VAT rate, applicable withholding tax rates, and personal/company income tax brackets. Rates are updated as tax laws change.'
        }
    ];

    return (
        <section className="py-20" id="faq">
            <div className="page-container">
                <div className="max-w-3xl mx-auto">
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
                                    &#9660;
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
            </div>
        </section>
    );
};
