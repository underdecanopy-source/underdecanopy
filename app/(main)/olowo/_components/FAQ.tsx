'use client';

import { useState } from 'react';

export const FAQ = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const faqData = [
        {
            question: 'What can I use in the current business workspace?',
            answer: 'After signing in, the current workspace supports business setup, products, warehouses, stock movements, customers, and completed sales. The deployment must have working authentication and database configuration. Later payment collection, returns, refunds, purchases, expenses, and reports are not yet available.'
        },
        {
            question: 'Does OLÓWÒ file tax returns?',
            answer: 'No. The separate browser demo can calculate illustrative tax amounts and prepare draft documents from demo data. It does not submit returns to a tax authority, and its tax records are not connected to persisted business sales.'
        },
        {
            question: 'Can I send a receipt from the demo?',
            answer: 'A signed-in user can attempt email through a configured mail service; without authentication or SMTP, the demo requests a local email draft instead. WhatsApp opens a share composer for you to complete. OLÓWÒ does not confirm that a recipient received or read a message.'
        },
        {
            question: 'Are the demo tax rates current and configurable?',
            answer: 'The demo uses tax values encoded in its current implementation. They are not business-configurable or versioned and may not reflect current law. Verify applicable rules with the relevant authority or a qualified professional.'
        },
        {
            question: 'Are demo records a durable business archive?',
            answer: 'No. Demo transactions, receipts, and reminders are stored in this browser, and generated draft PDFs use a separate demo file workflow. This is not a complete, tenant-scoped audit archive or a backup.'
        },
        {
            question: 'Which business modules are still pending?',
            answer: 'Purchases, suppliers, expense workflows, later payment collection, returns and refunds, complete accounting and reports, payroll, configurable tax rules, secure business documents, approvals, imports, exports, and backups are not yet implemented in the persisted workspace.'
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
