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
            <style>{`
                main[data-page="smarttax"] {
                    --primary: #1a4f72;
                    --secondary: #e9b949;
                    --accent: #2e8540;
                    --light: #f8f9fa;
                    --dark: #343a40;
                    --danger: #dc3545;
                    --success: #28a745;
                }
                
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }
                
                html {
                    scroll-behavior: smooth;
                    scroll-padding-top: 80px; /* Offset for fixed header */
                }

                body {
                    background-color: #f5f7fa;
                    color: var(--dark);
                    line-height: 1.6;
                }
                
                .container {
                    width: 90%;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 20px;
                }
                
                header {
                    background: linear-gradient(135deg, var(--primary), #0d3a5c);
                    color: white;
                    padding: 1rem 0;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    position: relative;
                }
                
                .header-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .logo {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                
                .logo h1 {
                    font-size: 1.8rem;
                    font-weight: 700;
                }
                
                .logo-icon {
                    font-size: 2rem;
                }
                
                nav ul {
                    display: flex;
                    list-style: none;
                    gap: 20px;
                }
                
                nav a {
                    color: white;
                    text-decoration: none;
                    font-weight: 500;
                    padding: 5px 10px;
                    border-radius: 4px;
                    transition: background 0.3s;
                }
                
                nav a:hover {
                    background: rgba(255,255,255,0.2);
                }

                .menu-toggle {
                    display: none;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 2rem;
                    cursor: pointer;
                }
                
                .hero {
                    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="400" viewBox="0 0 1200 400"><rect width="1200" height="400" fill="%231a4f72"/><path d="M0,200 Q300,100 600,200 T1200,200 L1200,400 L0,400 Z" fill="%230d3a5c"/></svg>') no-repeat center/cover;
                    color: white;
                    padding: 4rem 0;
                    text-align: center;
                }
                
                .hero h2 {
                    font-size: 2.5rem;
                    margin-bottom: 1rem;
                }
                
                .hero p {
                    font-size: 1.2rem;
                    max-width: 700px;
                    margin: 0 auto 2rem;
                }
                
                .btn {
                    display: inline-block;
                    background: var(--secondary);
                    color: var(--dark);
                    padding: 12px 24px;
                    border: none;
                    border-radius: 4px;
                    font-weight: 600;
                    cursor: pointer;
                    text-decoration: none;
                    transition: all 0.3s;
                }
                
                .btn:hover {
                    background: #d4a63a;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                }
                
                .btn-primary {
                    background: var(--accent);
                    color: white;
                }
                
                .btn-primary:hover {
                    background: #267835;
                }
                
                .features {
                    padding: 4rem 0;
                }
                
                .section-title {
                    text-align: center;
                    margin-bottom: 3rem;
                }
                
                .section-title h2 {
                    font-size: 2.2rem;
                    color: var(--primary);
                    margin-bottom: 1rem;
                }
                
                .section-title p {
                    color: #666;
                    max-width: 700px;
                    margin: 0 auto;
                }
                
                .features-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 30px;
                }
                
                .feature-card {
                    background: white;
                    border-radius: 8px;
                    padding: 30px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
                    transition: transform 0.3s;
                }
                
                .feature-card:hover {
                    transform: translateY(-5px);
                }
                
                .feature-icon {
                    font-size: 2.5rem;
                    color: var(--primary);
                    margin-bottom: 1rem;
                }
                
                .feature-card h3 {
                    font-size: 1.4rem;
                    margin-bottom: 1rem;
                    color: var(--primary);
                }
                
                .demo {
                    background: var(--light);
                    padding: 4rem 0;
                }
                
                .demo-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 40px;
                    align-items: center;
                }
                
                .demo-content {
                    flex: 1;
                    min-width: 300px;
                }
                
                .demo-receipt {
                    flex: 1;
                    min-width: 300px;
                    background: white;
                    border-radius: 8px;
                    padding: 20px;
                    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
                }
                
                .receipt-header {
                    text-align: center;
                    border-bottom: 2px dashed #ddd;
                    padding-bottom: 15px;
                    margin-bottom: 15px;
                }
                
                .receipt-details {
                    margin-bottom: 20px;
                }
                
                .receipt-item {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 10px;
                    padding-bottom: 10px;
                    border-bottom: 1px dashed #eee;
                }
                
                .receipt-total {
                    font-weight: bold;
                    border-top: 2px solid #ddd;
                    padding-top: 10px;
                    margin-top: 10px;
                }
                
                .tax-badge {
                    background: var(--accent);
                    color: white;
                    padding: 3px 8px;
                    border-radius: 4px;
                    font-size: 0.8rem;
                    margin-left: 5px;
                }
                
                .compliance {
                    padding: 4rem 0;
                }
                
                .compliance-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 20px;
                }
                
                .compliance-item {
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 3px 10px rgba(0,0,0,0.05);
                    border-left: 4px solid var(--accent);
                }
                
                .pricing {
                    background: var(--light);
                    padding: 4rem 0;
                }
                
                .pricing-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 30px;
                }
                
                .pricing-card {
                    background: white;
                    border-radius: 8px;
                    padding: 30px;
                    text-align: center;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
                    position: relative;
                }
                
                .popular {
                    border: 2px solid var(--secondary);
                }
                
                .popular-badge {
                    position: absolute;
                    top: -10px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: var(--secondary);
                    color: var(--dark);
                    padding: 5px 15px;
                    border-radius: 20px;
                    font-weight: bold;
                    font-size: 0.9rem;
                }
                
                .price {
                    font-size: 2.5rem;
                    font-weight: bold;
                    color: var(--primary);
                    margin: 20px 0;
                }
                
                .price span {
                    font-size: 1rem;
                    color: #666;
                }
                
                .pricing-features {
                    list-style: none;
                    margin: 20px 0;
                }
                
                .pricing-features li {
                    padding: 8px 0;
                    border-bottom: 1px solid #eee;
                }
                
                .pricing-features li:last-child {
                    border-bottom: none;
                }
                
                .faq {
                    padding: 4rem 0;
                }
                
                .faq-item {
                    margin-bottom: 20px;
                    border: 1px solid #eee;
                    border-radius: 8px;
                    overflow: hidden;
                }
                
                .faq-question {
                    padding: 15px 20px;
                    background: var(--light);
                    font-weight: 600;
                    cursor: pointer;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .faq-answer {
                    padding: 0 20px;
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.3s, padding 0.3s;
                }
                
                .faq-item.active .faq-answer {
                    padding: 20px;
                    max-height: 500px;
                }
                
                footer {
                    background: var(--dark);
                    color: white;
                    padding: 3rem 0 1rem;
                }
                
                .footer-content {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 30px;
                    margin-bottom: 2rem;
                }
                
                .footer-column h3 {
                    margin-bottom: 1rem;
                    font-size: 1.2rem;
                }
                
                .footer-column ul {
                    list-style: none;
                }
                
                .footer-column ul li {
                    margin-bottom: 10px;
                }
                
                .footer-column a {
                    color: #ccc;
                    text-decoration: none;
                    transition: color 0.3s;
                }
                
                .footer-column a:hover {
                    color: white;
                }
                
                .copyright {
                    text-align: center;
                    padding-top: 20px;
                    border-top: 1px solid #444;
                    color: #aaa;
                    font-size: 0.9rem;
                }
                
                @media (max-width: 768px) {
                    .header-content {
                        flex-wrap: wrap;
                    }

                    .menu-toggle {
                        display: block;
                    }

                    nav {
                        width: 100%;
                        max-height: 0;
                        overflow: hidden;
                        transition: max-height 0.3s ease-in-out;
                    }

                    nav.active {
                        max-height: 500px; /* Adjust as needed */
                    }
                    
                    nav ul {
                        flex-direction: column;
                        align-items: center;
                        padding: 20px 0;
                    }
                    
                    .hero h2 {
                        font-size: 2rem;
                    }
                }
            `}</style>
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