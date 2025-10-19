'use client';

import { useState } from 'react';
import { GraduationCap, Users, ChartLine, Smartphone, UserCheck, Clock, Lock, Fingerprint, ShieldCheck, Globe, Apple, Twitter, Facebook, Instagram, Youtube, MessageCircle, Store, Music } from 'lucide-react';

// Local icon fallbacks to prevent build failures from missing lucide-react exports
import HandHelpingIcon from '@/components/icons/HandHelping';
import ShieldIcon from '@/components/icons/Shield';
import MailIcon from '@/components/icons/Mail';
import PhoneIcon from '@/components/icons/Phone';

const config = {
    whatsAppNumber: "+2348064852108",
    email: "support@coophub.ng",
    socials: {
        facebook: "https://facebook.com/coophub",
        twitter: "https://twitter.com/coophub",
        instagram: "https://instagram.com/coophub",
        youtube: "https://youtube.com/coophub",
        tiktok: "https://tiktok.com/coophub",
    },
    appLinks: {
        apple: "https://apps.apple.com/ng/app/coophub/id6502437864",
        google: "https://play.google.com/store/apps/details?id=alat.ng.coophub",
        web: "https://coophub.alat.ng/login",
    },
    phone: "08064852108",
};

const faqData = [
    {
        question: "Is my money and personal data safe?",
        answer: "Yes. CoopHub is powered by a platform operated by Wema Bank, a licensed financial institution. Your most sensitive data (NIN, BVN) is collected, encrypted, and stored directly by Wema Bank under their stringent security controls. Our own privacy policy excludes this data."
    },
    {
        question: "Are there any hidden fees?",
        answer: "CoopHub is built on transparency. All applicable platform or transaction fees will be clearly displayed to you before you confirm any transaction. There are no hidden charges."
    },
    {
        question: "Can I get my money back if I need it?",
        answer: [
            "Yes. You have two levels of access:",
            "1. <strong>Wallet Savings:</strong> You can withdraw these at any time, no permission needed.",
            "2. <strong>Fee Contributions:</strong> You can submit a refund request, which we process back to your wallet within <strong>24-48 business hours.</strong> You can then withdraw it."
        ]
    },
    {
        question: "Who can join CoopHub?",
        answer: [
            "CoopHub is open to everyone! Students, entrepreneurs, salary earners, and anyone who believes in community savings and digital transformation. Our platform is designed to be inclusive and accessible to all."
        ]
    },
    {
        question: "How quickly can I access loans?",
        answer: "Once you've built up sufficient contributions in your cooperative account, you can apply for loans that are typically processed within 24-48 hours. The amount you can borrow is based on your savings history and contribution level."
    }
];

export default function Page() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [activeProduct, setActiveProduct] = useState('school-fees');
    const [activeProcess, setActiveProcess] = useState('school-fees');
    const toggleFaq = (index: number) => {
        if (openFaq === index) {
            setOpenFaq(null);
        } else {
            setOpenFaq(index);
        }
    };

    return (
        <>
            <main>
                <section className="hero" id="home">
                    <div className="container">
                        <h1>Your Secure Digital Platform for Education & Cooperative Finance</h1>
                        <p>Underdecanopy CoopHub is the secure, transparent platform for managing school fees and cooperative services, powered by Wema Bank.</p>

                        <div className="product-selector">
                            <button className={`product-tab ${activeProduct === 'school-fees' ? 'active' : ''}`} onClick={() => setActiveProduct('school-fees')}>School Fee Management</button>
                            <button className={`product-tab ${activeProduct === 'cooperative' ? 'active' : ''}`} onClick={() => setActiveProduct('cooperative')}>Cooperative Services</button>
                        </div>

                        <a href="#get-started" className="cta-button">Get Started Today</a>
                    </div>
                </section>

                <section className="products" id="products">
                    <div className="container">
                        <h2 className="section-title">Our Products</h2>
                        <div className="products-grid">
                            <div className="product-card">
                                <div className="product-icon" aria-hidden="true">
                                    <GraduationCap />
                                </div>
                                <h3>School Fee Management</h3>
                                <p>Secure, gradual savings for school fees with complete transparency and financial discipline.</p>
                                <ul className="product-features">
                                    <li>Gradual savings for stress-free fee payment</li>
                                    <li>Complete transaction transparency</li>
                                    <li>Withdraw wallet savings anytime</li>
                                    <li>Secure platform powered by Wema Bank</li>
                                </ul>
                            </div>

                            <div className="product-card cooperative">
                                <div className="product-icon" aria-hidden="true">
                                    <Users />
                                </div>
                                <h3>Cooperative Services</h3>
                                <p>Digital cooperative for savings, contributions, and loan access with full banking security.</p>
                                <ul className="product-features">
                                    <li>Easy weekly/monthly contributions</li>
                                    <li>Instant cooperative loan access</li>
                                    <li>Wema Bank verified wallet</li>
                                    <li>100% paperless & mobile friendly</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="features" id="features">
                    <div className="container">
                        <h2 className="section-title">Why Choose CoopHub?</h2>
                        <div className="features-grid">
                            <div className="feature-card">
                                <div className="feature-icon" aria-hidden="true">
                                    <Shield />
                                </div>
                                <h3>Bank-Grade Security</h3>
                                <p>Your data is protected with full digital footprints. Sensitive information is handled directly by Wema Bank.</p>
                            </div>

                            <div className="feature-card">
                                <div className="feature-icon" aria-hidden="true">
                                    <ChartLine />
                                </div>
                                <h3>Financial Discipline</h3>
                                <p>Ditch the last-minute panic. Save gradually and build healthy financial habits.</p>
                            </div>

                            <div className="feature-card">
                                <div className="feature-icon" aria-hidden="true">
                                    <HandHelping />
                                </div>
                                <h3>Loan Access</h3>
                                <p>Quick access to loans based on your contributions without lengthy paperwork.</p>
                            </div>

                            <div className="feature-card">
                                <div className="feature-icon" aria-hidden="true">
                                    <Smartphone />
                                </div>
                                <h3>100% Digital</h3>
                                <p>Complete digital experience accessible from anywhere on your mobile device.</p>
                            </div>

                            <div className="feature-card">
                                <div className="feature-icon" aria-hidden="true">
                                    <UserCheck/>
                                </div>
                                <h3>KYC Compliant</h3>
                                <p>Fully regulated and compliant with all financial regulations for your peace of mind.</p>
                            </div>

                            <div className="feature-card">
                                <div className="feature-icon" aria-hidden="true">
                                    <Clock />
                                </div>
                                <h3>24/7 Access</h3>
                                <p>Manage your finances anytime, anywhere with our always-available platform.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="how-it-works" id="how-it-works">
                    <div className="container">
                        <h2 className="section-title">How It Works</h2>

                        <div className="process-tabs">
                            <button className={`process-tab ${activeProcess === 'school-fees' ? 'active' : ''}`} onClick={() => setActiveProcess('school-fees')}>School Fee Management</button>
                            <button className={`process-tab ${activeProcess === 'cooperative' ? 'active' : ''}`} onClick={() => setActiveProcess('cooperative')}>Cooperative Services</button>
                        </div>

                        <div className={`process-content ${activeProcess === 'school-fees' ? 'active' : ''}`} id="school-fees-process">
                            <div className="step">
                                <div className="step-number">1</div>
                                <div className="step-content">
                                    <h3>Direct Message Us</h3>
                                    <p>Send your <strong>Matric Number, Email Address, and Phone Number</strong> to our official channels on Instagram or WhatsApp <strong>{config.whatsAppNumber}</strong>.</p>
                                </div>
                            </div>

                            <div className="step">
                                <div className="step-number">2</div>
                                <div className="step-content">
                                    <h3>Download the CoopHub App</h3>
                                    <p>Get the app from the Google Play Store, Apple App Store, or access it via the web.</p>
                                </div>
                            </div>

                            <div className="step">
                                <div className="step-number">3</div>
                                <div className="step-content">
                                    <h3>Register & Log In</h3>
                                    <p>Use the secure login credentials sent to your email to access your account.</p>
                                </div>
                            </div>

                            <div className="step">
                                <div className="step-number">4</div>
                                <div className="step-content">
                                    <h3>Complete Your KYC</h3>
                                    <p>Finalize your setup on the CoopHub platform. <strong className="text-red-500">For your security, we never see or store your NIN, BVN, or PIN.</strong> These are handled directly and securely by Wema Bank.</p>
                                </div>
                            </div>
                        </div>

                        <div className={`process-content cooperative-steps ${activeProcess === 'cooperative' ? 'active' : ''}`} id="cooperative-process">
                            <div className="step">
                                <div className="step-number">1</div>
                                <div className="step-content">
                                    <h3>Download the CoopHub App</h3>
                                    <p>Available on Android, iOS, or Web platform.</p>
                                </div>
                            </div>

                            <div className="step">
                                <div className="step-number">2</div>
                                <div className="step-content">
                                    <h3>Register and Log In</h3>
                                    <p>Use the credentials sent to your email.</p>
                                </div>
                            </div>

                            <div className="step">
                                <div className="step-number">3</div>
                                <div className="step-content">
                                    <h3>Complete Your KYC</h3>
                                    <p>Submit your NIN, BVN, and residential address directly to Wema Bank.</p>
                                </div>
                            </div>

                            <div className="step">
                                <div className="step-number">4</div>
                                <div className="step-content">
                                    <h3>Start Saving & Access Loans</h3>
                                    <p>Begin making contributions and access loans based on your savings.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="security">
                    <div className="container">
                        <h2 className="section-title section-title-light">Your Security Is Our Priority</h2>
                        <div className="security-grid">
                            <div className="security-card">
                                <div className="security-icon" aria-hidden="true">
                                    <Lock />
                                </div>
                                <h3>Bank-Level Encryption</h3>
                                <p>All data is encrypted using industry-standard protocols.</p>
                            </div>

                            <div className="security-card">
                                <div className="security-icon" aria-hidden="true">
                                    <Shield />
                                </div>
                                <h3>Wema Bank Backed</h3>
                                <p>Powered by CoopHub, a platform operated by Wema Bank.</p>
                            </div>

                            <div className="security-card">
                                <div className="security-icon" aria-hidden="true">
                                    <Fingerprint />
                                </div>
                                <h3>Secure KYC Process</h3>
                                <p>Sensitive data handled directly by Wema Bank under their security controls.</p>
                            </div>

                            <div className="security-card">
                                <div className="security-icon" aria-hidden="true">
                                    <ShieldCheck />
                                </div>
                                <h3>Regulatory Compliance</h3>
                                <p>Fully registered and compliant with financial regulations.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="faq" id="faq">
                    <div className="container">
                        <h2 className="section-title">Frequently Asked Questions</h2>
                        {faqData.map((faq, index) => (
                            <div className={`faq-item ${openFaq === index ? 'active' : ''}`} key={index}>
                                <button className="faq-question" onClick={() => toggleFaq(index)} aria-expanded={openFaq === index}>
                                    {faq.question}
                                </button>
                                <div className="faq-answer">
                                    {Array.isArray(faq.answer) ? (
                                        faq.answer.map((line, i) => <p key={i} dangerouslySetInnerHTML={{ __html: line }} />)
                                    ) : (
                                        <p dangerouslySetInnerHTML={{ __html: faq.answer }} />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="contact" id="contact">
                    <div className="container">
                        <h2 className="section-title section-title-light">We&apos;re Here to Help</h2>
                        <p className="text-center mb-12 text-[var(--gray)]">Can&apos;t find what you&apos;re looking for? Reach out to our support team.</p>

                        <div className="contact-methods">
                            <div className="contact-method">
                                <div className="contact-icon" aria-hidden="true"><Mail /></div>
                                <h3>Email Us</h3>
                                <p><a href={`mailto:${config.email}`}>{config.email}</a></p>
                            </div>
                            <div className="contact-method">
                                <div className="contact-icon" aria-hidden="true"><MessageCircle /></div>
                                <h3>Message on WhatsApp</h3>
                                <p><a href={`https://wa.me/${config.whatsAppNumber.replace('+', '')}`}>{config.whatsAppNumber}</a></p>
                            </div>
                            <div className="contact-method">
                                <div className="contact-icon" aria-hidden="true"><Globe /></div>
                                <h3>Follow & DM</h3>
                                <p>Follow <strong>@coophub</strong> on all social media platforms</p>
                            </div>
                        </div>

                        <div className="bg-[#222222] p-6 rounded-md border-l-4 border-[var(--primary)]">
                            <p className="text-[var(--gray)] m-0"><strong>Security Note:</strong> For your protection, please never send sensitive information like your NIN, BVN, or wallet PIN via email or social media. These details are only collected securely within the CoopHub app.</p>
                        </div>
                    </div>
                </section>

                <section className="get-started" id="get-started">
                    <div className="container">
                        <div className="section-header">
                            <h2><Phone /> Get Started Today</h2>
                            <p>Join thousands of people who are enjoying stress-free financial management.</p>
                        </div>

                        <div className="cta-buttons">
                            <a href={`tel:${config.phone}`} className="cta-button-large phone-button">
                                <Phone /> Call: {config.phone}
                            </a>
                            <span className="separator" role="separator">OR</span>
                            <a href={`https://wa.me/${config.whatsAppNumber.replace('+', '')}`} className="cta-button-large whatsapp-button">
                                <MessageCircle /> WhatsApp Us
                            </a>
                        </div>

                        <div className="download-section">
                            <p>Download the app now and begin managing your finances.</p>
                            <div className="download-buttons">
                                <a href={config.appLinks.apple} className="download-button app-store">
                                    <Apple /> App Store
                                </a>
                                <a href={config.appLinks.google} className="download-button play-store">
                                    <Store /> Play Store
                                </a>
                                <a href={config.appLinks.web} className="download-button web-app">
                                    <Globe /> Web App
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer>
                <div className="container">
                    <div className="footer-content">
                        <div>
                            <div className="footer-logo">
                                <div className="logo-icon" aria-hidden="true">
                                    <HandHelping />
                                </div>
                                CoopHub
                            </div>
                            <p>A product of <a href="http://www.underdecanopy.com" target="_blank" rel="noopener noreferrer" className="text-[var(--gray)] underline">Underdecanopy Digital Hub</a></p>
                            <p>(TIK Centre).</p>
                        </div>
                        <div className="footer-links">
                            <a href="#home">Home</a>
                            <a href="#products">Products</a>
                            <a href="#features">Features</a>
                            <a href="#how-it-works">How It Works</a>
                            <a href="#faq">FAQ</a>
                            <a href="#contact">Contact</a>
                        </div>
                        <div className="footer-social">
                            <p>Follow us: @coophub</p>
                            <a href={config.socials.facebook} aria-label="Follow us on Facebook"><Facebook /></a>
                            <a href={config.socials.twitter} aria-label="Follow us on Twitter"><Twitter /></a>
                            <a href={config.socials.instagram} aria-label="Follow us on Instagram"><Instagram /></a>
                            <a href={config.socials.youtube} aria-label="Follow us on YouTube"><Youtube /></a>
                            <a href={config.socials.tiktok} aria-label="Follow us on Tiktok"><Music /></a>
                        </div>
                    </div>
                    <div className="footer-copyright">
                        <p>&copy; <span id="copyright-year">{new Date().getFullYear()}</span> CoopHub. All rights reserved.</p>
                    </div>
                </div>
            </footer>

            <a href={`https://wa.me/${config.whatsAppNumber.replace('+', '')}?text=Hello%20CoopHub!%20I%20have%20an%20enquiry.`} className="whatsapp-float" aria-label="Chat on WhatsApp" target="_blank" rel="noopener">
                <MessageCircle />
            </a>
        </>
    );
}