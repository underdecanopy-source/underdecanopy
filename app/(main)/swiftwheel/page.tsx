'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function SwiftWheelPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const toggleFaq = (index: number) => setActiveFaq(activeFaq === index ? null : index);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fadeIn');
                }
            });
        }, { threshold: 0.1 });

        const cards = document.querySelectorAll('.service-card, .testimonial-card');
        cards.forEach(card => {
            observer.observe(card);
        });

        return () => {
            cards.forEach(card => {
                observer.unobserve(card);
            });
        };
    }, []);

    return (
        <>
            <Head>
                <title>CAC Registration & Annual Returns | Swift Wheel Services Nigeria</title>
                <meta name="description" content="Professional CAC registration services in Nigeria. Company incorporation, annual returns filing, business name registration. Fast, affordable & reliable corporate services." />
                <meta name="keywords" content="CAC Registration Nigeria, Company Incorporation Lagos, Annual Returns Filing, Business Registration Nigeria, Corporate Affairs Commission, NGO Registration, Limited Liability Company" />
                <meta property="og:title" content="CAC Registration & Annual Returns | Swift Wheel Services Nigeria" />
                <meta property="og:description" content="Swift, secure, and affordable CAC registration and corporate compliance services in Nigeria." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://swiftwheelservices.com" />
                <meta property="og:image" content="https://swiftwheelservices.com/logo.png" />
                <link rel="canonical" href="https://swiftwheelservices.com" />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `
                {
                  "@context": "https://schema.org",
                  "@type": "ProfessionalService",
                  "name": "Swift Wheel Services",
                  "description": "CAC registration and corporate compliance services in Nigeria",
                  "url": "https://swiftwheelservices.com",
                  "telephone": "+234-805-485-2108",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "TIK Centre, Opposite Medical Centre, Along Poly Main Road",
                    "addressLocality": "Ibadan",
                    "addressRegion": "Oyo State",
                    "addressCountry": "Nigeria"
                  },
                  "openingHours": "Mo-Su 00:00-24:00",
                  "serviceType": "CAC registration, company incorporation, annual returns"
                }
                `}} />
            </Head>
            <style jsx>{`
                .cta-button {
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }
                .cta-button:after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    transition: 0.5s;
                }
                .cta-button:hover:after {
                    left: 100%;
                }
                .service-card {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .service-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);
                }
                .sticky-header {
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }
                .testimonial-card {
                    background: #f8fafc;
                    border-left: 4px solid #3b82f6;
                }
                .feature-badge {
                    position: absolute;
                    top: -10px;
                    right: -10px;
                    background: #3b82f6;
                    color: white;
                    padding: 5px 10px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: bold;
                }
                .animate-fadeIn {
                    animation: fadeIn 0.6s ease-in;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .faq-item {
                    border: 1px solid #e5e7eb;
                    border-radius: 0.5rem;
                    margin-bottom: 1rem;
                    overflow: hidden;
                }
                .faq-question {
                    cursor: pointer;
                    width: 100%;
                    text-align: left;
                }
                .faq-answer {
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.3s ease-in-out, padding 0.3s ease-in-out;
                }
            `}</style>

            <div className="bg-gray-50 text-gray-800">
                {/* Sticky Header with Navigation */}
                <header className="sticky-header bg-blue-900 text-white">
                    <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                        <div>
                            <h1 className="text-xl font-bold">Swift Wheel Services</h1>
                            <p className="text-sm opacity-80">CAC Registration Experts. Professional registration and corporate compliance services in Nigeria.</p>
                        </div>
                        <nav className="hidden md:block">
                            <ul className="flex space-x-6">
                                <li><a href="#services" className="hover:text-blue-200">Services</a></li>
                                <li><a href="#pricing" className="hover:text-blue-200">Pricing</a></li>
                                <li><a href="#faq" className="hover:text-blue-200">FAQ</a></li>
                                <li><a href="#contact" className="hover:text-blue-200">Contact</a></li>
                            </ul>
                        </nav>
                        <div className="md:hidden">
                            <button id="mobile-menu-btn" className="text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                <i className="fas fa-bars text-2xl"></i>
                            </button>
                        </div>
                    </div>
                    <div id="mobile-menu" className={`${isMenuOpen ? 'block' : 'hidden'} bg-blue-800 px-4 py-2`}>
                        <ul className="space-y-2">
                            <li><a href="#services" className="block py-2 hover:text-blue-200">Services</a></li>
                            <li><a href="#pricing" className="block py-2 hover:text-blue-200">Pricing</a></li>
                            <li><a href="#faq" className="block py-2 hover:text-blue-200">FAQ</a></li>
                            <li><a href="#contact" className="block py-2 hover:text-blue-200">Contact</a></li>
                        </ul>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="bg-blue-900 text-white py-16 text-center">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">CAC Registration &amp; Annual Returns</h1>
                        <p className="text-xl mb-8">Swift, Secure &amp; Affordable Corporate Services in Nigeria</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a href="#contact" className="cta-button bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold text-lg">Get Started Today</a>
                            <a href="tel:08054852108" className="cta-button bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 font-semibold text-lg"><i className="fas fa-phone-alt mr-2"></i>Call Now</a>
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section id="services" className="py-16 px-4 md:px-8 bg-white">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12">Our Corporate Services</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="service-card bg-white shadow-lg rounded-xl p-6 text-center relative">
                                <div className="feature-badge">Popular</div>
                                <i className="fas fa-briefcase text-blue-600 text-4xl mb-4" aria-hidden="true"></i>
                                <h2 className="font-semibold text-xl mb-2">Business Name Registration</h2>
                                <p className="text-gray-600">This streamlined process is ideal for sole traders or small partnerships. It secures your business name and builds a brand identity.</p>
                            </div>
                            <div className="service-card bg-white shadow-lg rounded-xl p-6 text-center relative">
                                <div className="feature-badge">Best Value</div>
                                <i className="fas fa-building text-green-600 text-4xl mb-4" aria-hidden="true"></i>
                                <h2 className="font-semibold text-xl mb-2">Company Incorporation</h2>
                                <p className="text-gray-600">Forming a limited liability company gives your business a separate legal identity, protecting your personal assets and enabling commercial activities.</p>
                            </div>
                            <div className="service-card bg-white shadow-lg rounded-xl p-6 text-center">
                                <i className="fas fa-hands-helping text-purple-600 text-4xl mb-4" aria-hidden="true"></i>
                                <h2 className="font-semibold text-xl mb-2">Incorporated Trustees</h2>
                                <p className="text-gray-600">This is meant for NGOs, religious groups, and charities. It provides legal standing and the ability to manage donations and operations independently.</p>
                            </div>
                            <div className="service-card bg-white shadow-lg rounded-xl p-6 text-center">
                                <i className="fas fa-calendar-check text-yellow-600 text-4xl mb-4" aria-hidden="true"></i>
                                <h2 className="font-semibold text-xl mb-2">Annual Returns Filing</h2>
                                <p className="text-gray-600">This yearly obligation demonstrates your company&apos;s compliance with the CAC and tax authorities. We ensure timely and accurate filings.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Service Packages Section */}
                <section id="pricing" className="bg-gray-100 py-16 px-4 md:px-8">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-4">Our Service Packages</h2>
                        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">Choose the package that best fits your business needs. All packages include expert guidance and support.</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            <div className="border border-gray-300 rounded-lg p-6 shadow bg-white relative">
                                <div className="text-center mb-4">
                                    <h3 className="text-xl font-semibold">Business Name</h3>
                                    <p className="text-gray-600">Ideal for sole proprietors</p>
                                </div>
                                <ul className="list-disc list-inside mb-4 space-y-2">
                                    <li>CAC Certificate</li>
                                    <li>Status Report</li>
                                    <li>Notice of Approval</li>
                                    <li>TIN</li>
                                </ul>
                                <div className="text-center mt-6">
                                    <p className="text-2xl font-bold">₦20,000</p>
                                    <a href="https://wa.me/2348064852108?text=Hello! I'm interested in Business Name Registration" className="cta-button inline-block bg-blue-600 text-white px-6 py-2 rounded-lg mt-4 hover:bg-blue-700">Get Started</a>
                                </div>
                            </div>
                            
                            <div className="border border-blue-400 border-2 rounded-lg p-6 shadow-lg bg-white relative transform scale-105">
                                <div className="text-center mb-4">
                                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">MOST POPULAR</span>
                                    <h3 className="text-xl font-semibold mt-2">Limited Liability Company</h3>
                                    <p className="text-gray-600">Registered company with maximum of 1 million shares</p>
                                </div>
                                <ul className="list-disc list-inside mb-4 space-y-2">
                                    <li>CAC Certificate</li>
                                    <li>Status Report</li>
                                    <li>MEMART</li>
                                    <li>Notice of Approval</li>
                                    <li>TIN</li>
                                </ul>
                                <div className="text-center mt-6">
                                    <p className="text-2xl font-bold">₦40,000</p>
                                    <a href="https://wa.me/2348064852108?text=Hello! I'm interested in Limited Liability Company Registration" className="cta-button inline-block bg-blue-600 text-white px-6 py-2 rounded-lg mt-4 hover:bg-blue-700">Get Started</a>
                                </div>
                            </div>
                            
                            <div className="border border-gray-300 rounded-lg p-6 shadow bg-white relative">
                                <div className="text-center mb-4">
                                    <h3 className="text-xl font-semibold">Conversion Of Business Name To Limited Liability Company</h3>
                                    <p className="text-gray-600">Registered company with maximum of 1 million shares</p>
                                </div>
                                <ul className="list-disc list-inside mb-4 space-y-2">
                                    <li>CAC Certificate</li>
                                    <li>Status Report</li>
                                    <li>MEMART</li>
                                    <li>TIN</li>
                                </ul>
                                <div className="text-center mt-6">
                                    <p className="text-2xl font-bold">₦30,000</p>
                                    <a href="https://wa.me/2348064852108?text=Hello! I'm interested in converting my Business Name to LLC" className="cta-button inline-block bg-blue-600 text-white px-6 py-2 rounded-lg mt-4 hover:bg-blue-700">Get Started</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Additional Services Section */}
                <section className="bg-white py-16 px-4 md:px-8">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-4">Additional Services</h2>
                        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">We offer a comprehensive range of corporate compliance services to keep your business in good standing.</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold mb-4 text-blue-800">Compliance Services</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start"><i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i> <span>Annual Returns filing to keep your business registration valid</span></li>
                                    <li className="flex items-start"><i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i> <span>Regulatory filings with sectoral regulators</span></li>
                                    <li className="flex items-start"><i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i> <span>Filing of Special or Ordinary Resolutions</span></li>
                                    <li className="flex items-start"><i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i> <span>Filing of Annual Reports for Incorporated Trustees</span></li>
                                </ul>
                            </div>
                            
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold mb-4 text-blue-800">Modification Services</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start"><i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i> <span>Company Changes (directors, shareholders, address)</span></li>
                                    <li className="flex items-start"><i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i> <span>Change of Company Name with new certificate</span></li>
                                    <li className="flex items-start"><i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i> <span>Appointment or Removal of Directors/Trustees</span></li>
                                    <li className="flex items-start"><i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i> <span>Increase or Reduction of Share Capital</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="bg-blue-50 py-16 px-4 md:px-8">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="testimonial-card p-6 rounded-lg">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mr-4">
                                        <span className="text-blue-800 font-bold">AA</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Ade Adeyemi</h4>
                                        <p className="text-sm text-gray-600">Lagos Business Owner</p>
                                    </div>
                                </div>
                                <p className="text-gray-700">&quot;Swift Wheel Services made my company registration stress-free. They handled everything professionally and delivered faster than promised.&quot;</p>
                                <div className="flex mt-3">
                                    <i className="fas fa-star text-yellow-400"></i><i className="fas fa-star text-yellow-400"></i><i className="fas fa-star text-yellow-400"></i><i className="fas fa-star text-yellow-400"></i><i className="fas fa-star text-yellow-400"></i>
                                </div>
                            </div>
                            <div className="testimonial-card p-6 rounded-lg">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mr-4">
                                        <span className="text-blue-800 font-bold">CJ</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Chioma Johnson</h4>
                                        <p className="text-sm text-gray-600">NGO Director, Abuja</p>
                                    </div>
                                </div>
                                <p className="text-gray-700">&quot;We registered our NGO as Incorporated Trustees with Swift Wheel Services. Their expertise made the complex process simple and straightforward.&quot;</p>
                                <div className="flex mt-3">
                                    <i className="fas fa-star text-yellow-400"></i><i className="fas fa-star text-yellow-400"></i><i className="fas fa-star text-yellow-400"></i><i className="fas fa-star text-yellow-400"></i><i className="fas fa-star text-yellow-400"></i>
                                </div>
                            </div>
                            <div className="testimonial-card p-6 rounded-lg">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mr-4">
                                        <span className="text-blue-800 font-bold">OO</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Oluwaseun Ogunleye</h4>
                                        <p className="text-sm text-gray-600">Entrepreneur, Ibadan</p>
                                    </div>
                                </div>
                                <p className="text-gray-700">&quot;I converted my business name to a limited liability company with Swift Wheel. The process was smooth and their support was excellent throughout.&quot;</p>
                                <div className="flex mt-3">
                                    <i className="fas fa-star text-yellow-400"></i><i className="fas fa-star text-yellow-400"></i><i className="fas fa-star text-yellow-400"></i><i className="fas fa-star text-yellow-400"></i><i className="fas fa-star text-yellow-400"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Process Section */}
                <section className="bg-white py-16 px-4 md:px-8">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-4">Our Simple Process</h2>
                        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">We&apos;ve streamlined the CAC registration process to make it as simple as possible for you</p>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                            <div className="text-center"><div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"><span className="text-blue-800 font-bold text-xl">1</span></div><h3 className="font-semibold mb-2">Consultation</h3><p className="text-sm text-gray-600">We discuss your business needs and recommend the best registration option</p></div>
                            <div className="text-center"><div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"><span className="text-blue-800 font-bold text-xl">2</span></div><h3 className="font-semibold mb-2">Documentation</h3><p className="text-sm text-gray-600">We help you prepare and submit all required documents to CAC</p></div>
                            <div className="text-center"><div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"><span className="text-blue-800 font-bold text-xl">3</span></div><h3 className="font-semibold mb-2">Processing</h3><p className="text-sm text-gray-600">We handle the entire registration process with the Corporate Affairs Commission</p></div>
                            <div className="text-center"><div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"><span className="text-blue-800 font-bold text-xl">4</span></div><h3 className="font-semibold mb-2">Delivery</h3><p className="text-sm text-gray-600">We deliver your complete registration documents digitally or physically</p></div>
                        </div>
                    </div>
                </section>

                {/* Forms Section */}
                <section className="bg-gray-100 py-16 px-4 md:px-8 text-center">
                    <div className="container mx-auto max-w-3xl">
                        <h2 className="text-3xl font-bold mb-4">Start Your Registration</h2>
                        <p className="text-gray-600 mb-8">Click to fill out the necessary forms to begin your CAC registration process</p>
                        <div className="flex flex-col md:flex-row gap-6 justify-center">
                            <a href="https://docs.google.com/forms/d/e/1FAIpQLSffm3NbIsO9rItMrZ3MU-T-xn-5JLelnCifYfKSmHanqfA3fQ/viewform?usp=header" className="cta-button bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">Form 1 – CAC 2025 Registration</a>
                            <a href="https://docs.google.com/forms/d/e/1FAIpQLSffm3NbIsO9rItMrZ3MU-T-xn-5JLelnCifYfKSmHanqfA3fQ/viewform?usp=header" className="cta-button bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">Form 2 – Company Secretary</a>
                            <a href="https://docs.google.com/forms/d/e/1FAIpQLSffm3NbIsO9rItMrZ3MU-T-xn-5JLelnCifYfKSmHanqfA3fQ/viewform?usp=header" className="cta-button bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700">Form 3 – Witness Details</a>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section id="faq" className="bg-white py-16 px-4 md:px-8">
                    <div className="container mx-auto max-w-4xl">
                        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            {[
                                { q: "What is the cost of CAC post-registration services?", a: "Prices vary based on service. Annual Returns: ₦10,000, Business Name Changes: ₦15,000+, and CTCs: ₦5,000 each." },
                                { q: "Where is your office located?", a: "We are an online-first service, available nationwide in Nigeria. Delivery is available for printed copies (extra fee applies)." },
                                { q: "What are your work hours?", a: "We operate 24/7 except for calls from 12am–5am and 9am–12pm on Sundays." },
                                { q: "Do you deliver printed copies of documents?", a: "Yes, upon request and payment of applicable delivery charges." },
                                { q: "How long does CAC registration take?", a: "Usually between 2 to 7 working days depending on the type of registration and document readiness." },
                                { q: "What documents do I need?", a: "Passport photo, NIN slip, valid ID, and signatures. For LLC, details of directors, secretary, and a witness are required." },
                                { q: "Can I pay online?", a: "Yes. We accept transfers to our business account. For card payments and USSD options, please contact us." }
                            ].map((faq, index) => (
                                <div key={index} className="faq-item">
                                    <button
                                        className="faq-question bg-white text-lg font-semibold p-4 flex justify-between items-center"
                                        onClick={() => toggleFaq(index)}
                                        aria-expanded={activeFaq === index}
                                    >
                                        <span>{faq.q}</span>
                                        <i className={`fas fa-chevron-down transition-transform ${activeFaq === index ? 'rotate-180' : ''}`}></i>
                                    </button>
                                    <div
                                        className="faq-answer"
                                        style={{ maxHeight: activeFaq === index ? '200px' : '0px', padding: activeFaq === index ? '1rem' : '0 1rem' }}
                                    >
                                        <p className="p-4 bg-gray-50">{faq.a}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="bg-gray-100 py-16 px-4 md:px-8">
                    <div className="container mx-auto max-w-4xl">
                        <h2 className="text-3xl font-bold text-center mb-4">Contact Us</h2>
                        <p className="text-center text-gray-600 mb-12">Reach out to us for professional CAC registration services</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div>
                                <form action="https://formspree.io/f/xldwrqjg" method="POST" className="space-y-6">
                                    <div><label htmlFor="name" className="block mb-2 font-medium text-gray-700">Name</label><input type="text" name="name" id="name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required /></div>
                                    <div><label htmlFor="email" className="block mb-2 font-medium text-gray-700">Email</label><input type="email" name="email" id="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required /></div>
                                    <div><label htmlFor="phone" className="block mb-2 font-medium text-gray-700">Phone Number</label><input type="tel" name="phone" id="phone" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required /></div>
                                    <div><label htmlFor="service" className="block mb-2 font-medium text-gray-700">Service Needed</label><select name="service" id="service" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required><option value="">Select a service</option><option value="Business Name Registration">Business Name Registration</option><option value="Limited Liability Company">Limited Liability Company</option><option value="Conversion to LLC">Conversion to LLC</option><option value="Annual Returns">Annual Returns</option><option value="Other">Other</option></select></div>
                                    <div><label htmlFor="message" className="block mb-2 font-medium text-gray-700">Message</label><textarea name="message" id="message" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" rows={4} required></textarea></div>
                                    <button type="submit" className="cta-button bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold w-full">Send Message</button>
                                </form>
                            </div>
                            <div>
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-start"><i className="fas fa-envelope text-blue-600 mt-1 mr-3"></i><div><p className="font-medium">Email</p><a href="mailto:swiftwheelservices@gmail.com" className="text-blue-600">swiftwheelservices@gmail.com</a></div></div>
                                        <div className="flex items-start"><i className="fas fa-phone-alt text-blue-600 mt-1 mr-3"></i><div><p className="font-medium">Phone</p><a href="tel:08064852108" className="text-blue-600">08064852108</a></div></div>
                                        <div className="flex items-start"><i className="fas fa-map-marker-alt text-blue-600 mt-1 mr-3"></i><div><p className="font-medium">Address</p><p>TIK Centre, Opposite Medical Centre, Along Poly Main Road, The Polytechnic, Ibadan, Oyo State.</p></div></div>
                                        <div className="flex items-start"><i className="fas fa-clock text-blue-600 mt-1 mr-3"></i><div><p className="font-medium">Working Hours</p><p>24/7 (Except calls from 12am–5am and 9am–12pm on Sundays)</p></div></div>
                                    </div>
                                    <div className="mt-6">
                                        <h4 className="font-semibold mb-3">Follow Us</h4>
                                        <div className="flex space-x-4">
                                            <a className="hover:text-blue-400 text-blue-600" href="https://facebook.com/YourPage" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook fa-lg"></i></a>
                                            <a className="hover:text-blue-300 text-blue-600" href="https://twitter.com/YourPage" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter fa-lg"></i></a>
                                            <a className="hover:text-pink-400 text-blue-600" href="https://instagram.com/YourPage" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram fa-lg"></i></a>
                                            <a className="hover:text-green-400 text-blue-600" href="https://wa.me/2348064852108" target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp fa-lg"></i></a>
                                            <a className="hover:text-blue-200 text-blue-600" href="https://tiktok.com/YourPage" target="_blank" rel="noopener noreferrer"><i className="fab fa-tiktok fa-lg"></i></a>
                                            <a className="hover:text-blue-200 text-blue-600" href="https://youtube.com/skoolpay" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-youtube"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-blue-900 text-white py-2 px-4 md:px-8">
                    <div className="container mx-auto">
                        <div className="text-center">
                            <p>© 2024 Swift Wheel Services. All rights reserved.</p>
                        </div>
                    </div>
                </footer>

            </div>
        </>
    );
}