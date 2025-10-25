'use client';

import { useState } from 'react';
import { ContactSection } from '@/components/contact/ContactSection';
import { MobileOptimizedFooter } from '@/components/contact/MobileOptimizedFooter';


export default function SmartTaxPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    const handleDemoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        alert('Thank you for your interest in SmartTax! In a full implementation, this would redirect to a registration form.');
    };

    return (
        <>
            <header>
                <div className="container header-content">
                    <div className="logo">
                        <div className="logo-icon">🧾</div>
                        <h1>SmartTax</h1>
                    </div>
                    <button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        &#9776;
                    </button>
                    <nav className={isMenuOpen ? 'active' : ''}>
                        <ul>
                            <li><a href="#features">Features</a></li>
                            <li><a href="#demo">How It Works</a></li>
                            <li><a href="#compliance">Compliance</a></li>
                            <li><a href="#pricing">Pricing</a></li>
                            <li><a href="#faq">FAQ</a></li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main data-page="smarttax">
                <section className="hero">
                    <div className="container">
                        <h2>AI-Powered SmartTax for Nigerian Businesses</h2>
                        <p>Generate CAC and Tax Law 2025 compliant digital receipts for your transactions. Simplify your tax filing and annual returns with our intelligent solution.</p>
                        <a href="#" className="btn btn-primary" onClick={handleDemoClick}>Get Started Today</a>
                    </div>
                </section>

                <section className="features" id="features">
                    <div className="container">
                        <div className="section-title">
                            <h2>Powerful Features for Your Business</h2>
                            <p>Designed specifically for Nigerian service businesses to streamline receipt management and tax compliance</p>
                        </div>
                        <div className="features-grid">
                            <div className="feature-card">
                                <div className="feature-icon">🤖</div>
                                <h3>AI-Powered Categorization</h3>
                                <p>Our AI automatically categorizes transactions according to Nigerian tax codes and CAC requirements, reducing manual work.</p>
                            </div>
                            <div className="feature-card">
                                <div className="feature-icon">📱</div>
                                <h3>Multi-Platform Access</h3>
                                <p>Create and manage receipts from any device - desktop, tablet, or smartphone. Works online and offline.</p>
                            </div>
                            <div className="feature-card">
                                <div className="feature-icon">🔒</div>
                                <h3>Secure & Tamper-Proof</h3>
                                <p>All receipts are digitally signed and stored securely with blockchain verification to prevent fraud.</p>
                            </div>
                            <div className="feature-card">
                                <div className="feature-icon">📊</div>
                                <h3>Automated Tax Calculations</h3>
                                <p>Automatically calculates VAT, WHT, and other taxes according to the latest Nigerian tax laws.</p>
                            </div>
                            <div className="feature-card">
                                <div className="feature-icon">📋</div>
                                <h3>CAC Returns Preparation</h3>
                                <p>Generate pre-filled CAC annual return forms directly from your transaction data.</p>
                            </div>
                            <div className="feature-card">
                                <div className="feature-icon">🔄</div>
                                <h3>Seamless Integration</h3>
                                <p>Connect with popular accounting software and banking apps for automated data sync.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="demo" id="demo">
                    <div className="container">
                        <div className="section-title">
                            <h2>How SmartTax Works</h2>
                            <p>Simple, fast, and compliant receipt generation in three easy steps</p>
                        </div>
                        <div className="demo-container">
                            <div className="demo-content">
                                <h3>1. Enter Transaction Details</h3>
                                <p>Input customer information, items/services, and amounts. Our AI suggests appropriate tax categories.</p>

                                <h3>2. Automatic Compliance Check</h3>
                                <p>The system verifies that all required fields are completed according to CAC and FIRS requirements.</p>

                                <h3>3. Generate & Share</h3>
                                <p>Create a professional e-receipt that can be printed, emailed, or sent via WhatsApp to your customers.</p>

                                <a href="#" className="btn" onClick={handleDemoClick}>Try for 1 Month</a>
                            </div>
                            <div className="demo-receipt">
                                <div className="receipt-header">
                                    <h3>SmartTax</h3>
                                    <p>Digital Receipt</p>
                                    <p>RC: 1234567 | TIN: 123-456-789</p>
                                </div>
                                <div className="receipt-details">
                                    <p><strong>Date:</strong> 15 March, 2025</p>
                                    <p><strong>Receipt No:</strong> ERP-2025-001234</p>
                                    <p><strong>Customer:</strong> Adebayo Johnson</p>
                                </div>
                                <div className="receipt-items">
                                    <div className="receipt-item">
                                        <span>Plumbing Service Fee</span>
                                        <span>₦25,000</span>
                                    </div>
                                    <div className="receipt-item">
                                        <span>Materials <span className="tax-badge">VAT 7.5%</span></span>
                                        <span>₦15,000</span>
                                    </div>
                                    <div className="receipt-item">
                                        <span>VAT <span className="tax-badge">₦1,125</span></span>
                                        <span>₦1,125</span>
                                    </div>
                                    <div className="receipt-total">
                                        <span>Total</span>
                                        <span>₦41,125</span>
                                    </div>
                                </div>
                                <div className="receipt-footer">
                                    <p><strong>Payment Method:</strong> Bank Transfer</p>
                                    <p><strong>Tax Compliance:</strong> ✔️ 2025 Compliant</p>
                                    <p><small>This is a digitally signed receipt. Verify at smarttax.ng/verify</small></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="compliance" id="compliance">
                    <div className="container">
                        <div className="section-title">
                            <h2>Full Compliance with Nigerian Regulations</h2>
                            <p>SmartTax ensures your business meets all legal requirements for record-keeping and tax reporting</p>
                        </div>
                        <div className="compliance-grid">
                            <div className="compliance-item">
                                <h3>CAC Requirements</h3>
                                <p>Properly documented transactions for annual returns with automated form generation.</p>
                            </div>
                            <div className="compliance-item">
                                <h3>Tax Law 2025</h3>
                                <p>Updated with latest VAT, WHT, and income tax regulations including e-invoicing mandates.</p>
                            </div>
                            <div className="compliance-item">
                                <h3>Data Protection</h3>
                                <p>Compliant with NDPA 2023 for secure handling of customer and business data.</p>
                            </div>
                            <div className="compliance-item">
                                <h3>FIRS Acceptance</h3>
                                <p>All receipts include required fields and formats accepted by the Federal Inland Revenue Service.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="pricing" id="pricing">
                    <div className="container">
                        <div className="section-title">
                            <h2>Simple, Transparent Pricing</h2>
                            <p>Choose the plan that works for your business size and needs</p>
                        </div>
                        <div className="pricing-grid">
                            <div className="pricing-card">
                                <h3>Starter</h3>
                                <div className="price">₦2,500<span>/month</span></div>
                                <p>Ideal for small businesses with limited transactions</p>
                                <ul className="pricing-features">
                                    <li>Up to 100 receipts/month</li>
                                    <li>Basic tax calculations</li>
                                    <li>Email support</li>
                                    <li>1-year data retention</li>
                                </ul>
                                <a href="#" className="btn" onClick={handleDemoClick}>Get Started</a>
                            </div>
                            <div className="pricing-card popular">
                                <div className="popular-badge">MOST POPULAR</div>
                                <h3>Professional</h3>
                                <div className="price">₦7,500<span>/month</span></div>
                                <p>Perfect for growing service businesses</p>
                                <ul className="pricing-features">
                                    <li>Up to 500 receipts/month</li>
                                    <li>AI categorization</li>
                                    <li>CAC returns preparation</li>
                                    <li>Priority support</li>
                                    <li>3-year data retention</li>
                                </ul>
                                <a href="#" className="btn btn-primary" onClick={handleDemoClick}>Try 1 Month Free (100 Receipts Max.)</a>
                            </div>
                            <div className="pricing-card">
                                <h3>Enterprise</h3>
                                <div className="price">₦20,000<span>/month</span></div>
                                <p>For large businesses with multiple locations</p>
                                <ul className="pricing-features">
                                    <li>2,000 receipts/month + overage fees</li>
                                    <li>Multi-user access (5 seats)</li>
                                    <li>API integration + advanced analytics</li>
                                    <li>Dedicated account manager</li>
                                    <li>10-year data retention</li>
                                </ul>
                                <a href="#" className="btn" onClick={handleDemoClick}>Contact Sales</a>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="faq" id="faq">
                    <div className="container">
                        <div className="section-title">
                            <h2>Frequently Asked Questions</h2>
                            <p>Find answers to common questions about SmartTax</p>
                        </div>
                        <div className="faq-list">
                            <div className={`faq-item ${activeFaq === 0 ? 'active' : ''}`}>
                                <div className="faq-question" onClick={() => toggleFaq(0)}>
                                    <span>Is SmartTax accepted by CAC and FIRS?</span>
                                    <span>{activeFaq === 0 ? '-' : '+'}</span>
                                </div>
                                <div className="faq-answer">
                                    <p>Yes, SmartTax is fully compliant with CAC record-keeping requirements and FIRS e-invoicing regulations as per the 2025 Tax Law. All receipts include necessary fields and digital signatures for verification.</p>
                                </div>
                            </div>
                            <div className={`faq-item ${activeFaq === 1 ? 'active' : ''}`}>
                                <div className="faq-question" onClick={() => toggleFaq(1)}>
                                    <span>How does the AI categorization work?</span>
                                    <span>{activeFaq === 1 ? '-' : '+'}</span>
                                </div>
                                <div className="faq-answer">
                                    <p>Our AI analyzes transaction descriptions and amounts to automatically assign appropriate tax codes and categories based on Nigerian tax legislation. This reduces manual errors and ensures proper classification for tax purposes.</p>
                                </div>
                            </div>
                            <div className={`faq-item ${activeFaq === 2 ? 'active' : ''}`}>
                                <div className="faq-question" onClick={() => toggleFaq(2)}>
                                    <span>Can I use SmartTax offline?</span>
                                    <span>{activeFaq === 2 ? '-' : '+'}</span>
                                </div>
                                <div className="faq-answer">
                                    <p>Yes, our mobile app allows you to create receipts offline. They will sync automatically when you&apos;re back online, ensuring you never miss recording a transaction.</p>
                                </div>
                            </div>
                            <div className={`faq-item ${activeFaq === 3 ? 'active' : ''}`}>
                                <div className="faq-question" onClick={() => toggleFaq(3)}>
                                    <span>What happens to my data if I cancel my subscription?</span>
                                    <span>{activeFaq === 3 ? '-' : '+'}</span>
                                </div>
                                <div className="faq-answer">
                                    <p>You can export all your data in standard formats (PDF, Excel) before cancellation. According to Nigerian law, we&apos;re required to maintain business records for 6 years, so your data remains securely stored for compliance purposes.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <ContactSection
                    title="Simplify Your Tax Management"
                    subtitle="Get started with SmartTax today"
                />

                <MobileOptimizedFooter serviceName="SmartTax" showQuickContact={false} />
            </main>
        </>
    );
}