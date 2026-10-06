'use client';

import { useState } from 'react';

export const FAQ = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const faqData = [
        {
            question: 'What types of receipts can I generate with Olowo?',
            answer: 'Olowo supports sales receipts, service invoices, payment confirmations, and VAT receipts. Each receipt includes your business name, customer details, itemized list of products or services, tax breakdown, and a unique receipt number for tracking.'
        },
        {
            question: 'How does Olowo help with tax filing?',
            answer: 'Olowo tracks transactions, calculates tax obligations (including VAT, withholding tax, and personal/company income tax), and prepares forms for filing with NRS or your state tax authority. You review and submit the prepared returns.'
        },
        {
            question: 'Can I send receipts directly to my customers?',
            answer: 'Yes. Olowo lets you send digital receipts to customers via email, SMS, or WhatsApp after a transaction. Customers receive a branded receipt with transaction details.'
        },
        {
            question: 'Is Olowo suitable for my type of business?',
            answer: 'Olowo is being built for SMEs. This demo focuses on digital receipts and tax workflows; the wider Business OS is intended to connect more of a business’s operations over time.'
        },
        {
            question: 'How do I get my tax records if I am audited?',
            answer: 'The demo provides document and data export options for its receipts and tax records. Production data portability and audit capabilities are platform requirements for Olowo.'
        },
        {
            question: 'What tax rates does Olowo use?',
            answer: 'Olowo uses the Nigerian tax rates configured in the product. Verify applicable rates with the relevant tax authority or a qualified professional.'
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
