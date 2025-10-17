'use client'

import { useState } from 'react';
import { HandHoldingUsd, GraduationCap, Users, ShieldAlt, ChartLine, MobileAlt, UserCheck, Clock, Lock, UserShield, Fingerprint, ShieldCheck, Envelope, Globe, PhoneAlt, Apple, Twitter, Facebook, Instagram, Youtube, MessageCircle } from 'lucide-react';

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
        answer: "Yes. You have two levels of access:<br />1. <strong>Wallet Savings:</strong> You can withdraw these at any time, no permission needed.<br />2. <strong>Fee Contributions:</strong> You can submit a refund request, which we process back to your wallet within <strong>24-48 business hours.</strong> You can then withdraw it."
    },
    {
        question: "Who can join CoopHub?",
        answer: "CoopHub is open to everyone! Students, entrepreneurs, salary earners, and anyone who believes in community savings and digital transformation. Our platform is designed to be inclusive and accessible to all."
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
            <style>{`
                :root {
                    --primary: #1a237e;
                    --primary-dark: #1a237e;
                    --secondary: #046c4e;
                    --accent: #ff9800;
                    --light: #e8f0fe;
                    --light-alt: #f0f7ff;
                    --white: #ffffff;
                    --dark: #333333;
                    --gray: #f5f5f5;
                    --light-blue: #82aaff;
                    --success: #388e3c;
                    --warning: #f57c00;
                    --shadow: 0 5px 15px rgba(0,0,0,0.08);
                    --transition: all 0.3s ease;
                    --border-radius: 12px;
                }
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                html {
                    scroll-behavior: smooth;
                    scroll-padding-top: 80px; /* Offset for fixed header */
                }
                body {
                    font-family: 'Inter', sans-serif;
                    line-height: 1.6;
                    color: var(--dark);
                    background-color: var(--gray);
                }
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 20px;
                }
                header {
                    background-color: var(--white);
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                    position: fixed;
                    width: 100%;
                    top: 0;
                    z-index: 1000;
                }
                nav {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 0;
                }
                .logo {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--primary);
                    text-decoration: none;
                }
                .logo-icon {
                    width: 32px;
                    height: 32px;
                    background-color: var(--primary);
                    border-radius: 6px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                }
                .nav-links {
                    display: flex;
                    list-style: none;
                    gap: 2rem;
                }
                .nav-links a {
                    text-decoration: none;
                    color: var(--dark);
                    font-weight: 500;
                    transition: color 0.3s;
                }
                .nav-links a:hover {
                    color: var(--primary);
                }
                .mobile-menu {
                    display: none;
                    font-size: 1.5rem;
                    background: none;
                    border: none;
                    color: var(--primary);
                    cursor: pointer;
                    z-index: 1001;
                }
                .hero {
                    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
                    color: var(--white);
                    padding: 140px 0 80px;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                }
                .hero::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
                    z-index: 1;
                }
                .hero .container {
                    position: relative;
                    z-index: 2;
                }
                .hero h1 {
                    font-size: 2.8rem;
                    margin-bottom: 1.5rem;
                    font-weight: 700;
                }
                .hero p {
                    font-size: 1.2rem;
                    margin-bottom: 2.5rem;
                    opacity: 0.9;
                    max-width: 700px;
                    margin-left: auto;
                    margin-right: auto;
                }
                .product-selector {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    margin-bottom: 2rem;
                }
                .product-tab {
                    background: rgba(255, 255, 255, 0.15);
                    padding: 12px 24px;
                    border-radius: 50px;
                    font-weight: 600;
                    border: 2px solid transparent;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .product-tab.active {
                    background: rgba(255, 255, 255, 0.3);
                    border-color: var(--accent);
                }
                .product-tab:hover {
                    background: rgba(255, 255, 255, 0.25);
                }
                .cta-button {
                    display: inline-block;
                    background-color: var(--accent);
                    color: var(--white);
                    padding: 14px 32px;
                    border-radius: 50px;
                    text-decoration: none;
                    font-weight: bold;
                    transition: transform 0.3s, box-shadow 0.3s;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                }
                .cta-button:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(0,0,0,0.3);
                }
                .products {
                    padding: 80px 0;
                    background-color: var(--white);
                }
                .section-title {
                    text-align: center;
                    margin-bottom: 3rem;
                    color: var(--dark);
                    font-size: 2.0rem;
                }
                .section-title-light {
                    color: var(--white);
                }
                .products-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                }
                .product-card {
                    background: var(--white);
                    padding: 2.5rem 2rem;
                    border-radius: 12px;
                    text-align: center;
                    box-shadow: var(--shadow);
                    transition: transform 0.3s;
                    border-top: 4px solid var(--primary);
                    position: relative;
                    overflow: hidden;
                }
                .product-card.cooperative {
                    border-top-color: var(--secondary);
                }
                .product-card:hover {
                    transform: translateY(-5px);
                }
                .product-icon {
                    width: 70px;
                    height: 70px;
                    background-color: var(--primary);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1.5rem;
                    color: var(--white);
                    font-size: 1.8rem;
                }
                .cooperative .product-icon {
                    background-color: var(--secondary);
                }
                .product-card h3 {
                    font-size: 1.5rem;
                    margin-bottom: 1rem;
                }
                .product-features {
                    list-style: none;
                    text-align: left;
                    margin-top: 1.5rem;
                }
                .product-features li {
                    padding: 8px 0;
                    position: relative;
                    padding-left: 30px;
                }
                .product-features li:before {
                    content: '✓';
                    position: absolute;
                    left: 0;
                    color: var(--success);
                    font-weight: bold;
                }
                .features {
                    padding: 80px 0;
                    background-color: var(--gray);
                }
                .features-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 2rem;
                }
                .feature-card {
                    background: var(--white);
                    padding: 2rem;
                    border-radius: 12px;
                    box-shadow: var(--shadow);
                    transition: transform 0.3s;
                }
                .feature-card:hover {
                    transform: translateY(-5px);
                }
                .feature-icon {
                    width: 60px;
                    height: 60px;
                    background-color: var(--light);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 1.5rem;
                    color: var(--primary);
                    font-size: 1.5rem;
                }
                .how-it-works {
                    padding: 80px 0;
                    background-color: var(--white);
                }
                .process-tabs {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 3rem;
                    border-bottom: 1px solid #eee;
                }
                .process-tab {
                    padding: 12px 24px;
                    background: none;
                    border: none;
                    font-size: 1.1rem;
                    font-weight: 600;
                    cursor: pointer;
                    color: var(--dark);
                    border-bottom: 3px solid transparent;
                    transition: all 0.3s;
                }
                .process-tab.active {
                    color: var(--primary);
                    border-bottom-color: var(--primary);
                }
                .process-content {
                    display: none;
                }
                .process-content.active {
                    display: block;
                }
                .step {
                    display: flex;
                    align-items: center;
                    margin-bottom: 2.5rem;
                    gap: 2rem;
                }
                .step-number {
                    background-color: var(--primary);
                    color: var(--white);
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                    font-weight: bold;
                    flex-shrink: 0;
                }
                .cooperative-steps .step-number {
                    background-color: var(--secondary);
                }
                .step-content {
                    flex: 1;
                }
                .security {
                    padding: 80px 0;
                    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
                    color: var(--white);
                }
                .security-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 2rem;
                }
                .security-card {
                    background: rgba(255, 255, 255, 0.1);
                    padding: 2rem;
                    border-radius: 12px;
                    text-align: center;
                    backdrop-filter: blur(10px);
                }
                .security-icon {
                    width: 60px;
                    height: 60px;
                    background-color: rgba(255, 255, 255, 0.2);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1.5rem;
                    color: var(--white);
                    font-size: 1.5rem;
                }
                .faq {
                    padding: 80px 0;
                    background-color: var(--gray);
                }
                .faq-item {
                    background: var(--white);
                    margin-bottom: 1rem;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                }
                .faq-question {
                    padding: 1.5rem;
                    background-color: var(--white);
                    color: var(--dark);
                    cursor: pointer;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-weight: 600;
                    border-left: 4px solid var(--primary);
                }
                .faq-answer {
                    padding: 0 1.5rem;
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.3s ease, padding 0.3s ease;
                }
                .contact {
                    padding: 80px 0;
                    background-color: var(--dark);
                    color: var(--white);
                }
                .contact-methods {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 2rem;
                    margin-bottom: 3rem;
                }
                .contact-method {
                    text-align: center;
                    padding: 2rem;
                    background-color: #444444;
                    border-radius: 8px;
                }
                .contact-icon {
                    width: 50px;
                    height: 50px;
                    background-color: var(--accent);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1rem;
                    color: var(--white);
                    font-size: 1.2rem;
                }
                .contact-method a {
                    color: var(--light-blue);
                    text-decoration: none;
                }
                .get-started {
                    padding: 100px 0;
                    background: linear-gradient(135deg, var(--primary) 0%, var(--light-blue) 100%);
                    color: var(--white);
                    position: relative;
                    overflow: hidden;
                }
                .get-started::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
                    z-index: 1;
                }
                .get-started .container {
                    position: relative;
                    z-index: 2;
                }
                .section-header {
                    text-align: center;
                    margin-bottom: 60px;
                }
                .section-header h2 {
                    font-size: 2.2rem;
                    font-weight: 700;
                    margin-bottom: 20px;
                    position: relative;
                    display: inline-block;
                }
                .section-header h2::after {
                    content: '';
                    position: absolute;
                    bottom: -10px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 80px;
                    height: 4px;
                    background-color: var(--accent);
                    border-radius: 2px;
                }
                .section-header p {
                    font-size: 1.2rem;
                    max-width: 600px;
                    margin: 0 auto;
                    opacity: 0.9;
                }
                .cta-buttons {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 30px;
                    margin-bottom: 60px;
                    flex-wrap: wrap;
                }
                .cta-button-large {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 16px 32px;
                    border-radius: 50px;
                    font-weight: 600;
                    font-size: 1.1rem;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                    position: relative;
                    overflow: hidden;
                    z-index: 1;
                }
                .cta-button-large::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.2) 100%);
                    z-index: -1;
                    transition: opacity 0.3s ease;
                    opacity: 0;
                }
                .cta-button-large:hover::before {
                    opacity: 1;
                }
                .cta-button-large:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
                }
                .cta-button-large:active {
                    transform: translateY(-1px);
                }
                .cta-button-large i {
                    margin-right: 10px;
                    font-size: 1.2rem;
                }
                .phone-button {
                    background-color: var(--white);
                    color: var(--primary);
                }
                .whatsapp-button {
                    background-color: #25D366;
                    color: white;
                }
                .separator {
                    font-size: 1.2rem;
                    font-weight: 600;
                    opacity: 0.8;
                }
                .download-section {
                    text-align: center;
                }
                .download-section p {
                    font-size: 1.2rem;
                    margin-bottom: 30px;
                    opacity: 0.9;
                }
                .download-buttons {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    flex-wrap: wrap;
                }
                .download-button {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 14px 28px;
                    border-radius: 12px;
                    font-weight: 600;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    min-width: 180px;
                }
                .download-button:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
                }
                .download-button i {
                    margin-right: 10px;
                    font-size: 1.5rem;
                }
                .app-store {
                    background-color: #000;
                    color: white;
                }
                .play-store {
                    background-color: #0F9D58;
                    color: white;
                }
                .web-app {
                    background-color: #333;
                    color: white;
                }
                footer {
                    background-color: var(--dark);
                    color: var(--white);
                    padding: 3rem 0 1rem;
                }
                .footer-content {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 2rem;
                    margin-bottom: 2rem;
                }
                .footer-logo {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--white);
                    margin-bottom: 1rem;
                }
                .footer-links {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                .footer-links a {
                    color: var(--gray);
                    text-decoration: none;
                    transition: color 0.3s;
                }
                .footer-links a:hover {
                    color: var(--white);
                }
                .footer-social a {
                    color: var(--gray);
                    text-decoration: none;
                    margin-right: 1rem;
                    font-size: 1.5rem;
                }
                .footer-copyright {
                    text-align: center;
                    padding-top: 2rem;
                    border-top: 1px solid #444444;
                    color: var(--gray);
                }
                .whatsapp-float {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background-color: #25d366;
                    color: #fff;
                    border-radius: 50%;
                    width: 60px;
                    height: 60px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 2rem;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
                    z-index: 100;
                    transition: transform 0.3s;
                }
                .whatsapp-float:hover {
                    transform: scale(1.1);
                }
            `}</style>

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
                                    <ShieldAlt />
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
                                    <HandHoldingUsd />
                                </div>
                                <h3>Loan Access</h3>
                                <p>Quick access to loans based on your contributions without lengthy paperwork.</p>
                            </div>

                            <div className="feature-card">
                                <div className="feature-icon" aria-hidden="true">
                                    <MobileAlt />
                                </div>
                                <h3>100% Digital</h3>
                                <p>Complete digital experience accessible from anywhere on your mobile device.</p>
                            </div>

                            <div className="feature-card">
                                <div className="feature-icon" aria-hidden="true">
                                    <UserCheck />
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
                                    <p>Finalize your setup on the CoopHub platform. <strong style={{ color: "#FF0000" }}>For your security, we never see or store your NIN, BVN, or PIN.</strong> These are handled directly and securely by Wema Bank.</p>
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
                                    <UserShield />
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
                                <div className="faq-question" onClick={() => toggleFaq(index)}>
                                    {faq.question}
                                </div>
                                <div className="faq-answer">
                                    <p dangerouslySetInnerHTML={{ __html: faq.answer }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="contact" id="contact">
                    <div className="container">
                        <h2 className="section-title section-title-light">We're Here to Help</h2>
                        <p style={{ textAlign: 'center', marginBottom: '3rem', color: 'var(--gray)' }}>Can't find what you're looking for? Reach out to our support team.</p>

                        <div className="contact-methods">
                            <div className="contact-method">
                                <div className="contact-icon" aria-hidden="true"><Envelope /></div>
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

                        <div style={{ backgroundColor: '#222222', padding: '1.5rem', borderRadius: '5px', borderLeft: '4px solid var(--primary)' }}>
                            <p style={{ color: 'var(--gray)', margin: 0 }}><strong>Security Note:</strong> For your protection, please never send sensitive information like your NIN, BVN, or wallet PIN via email or social media. These details are only collected securely within the CoopHub app.</p>
                        </div>
                    </div>
                </section>

                <section className="get-started" id="get-started">
                    <div className="container">
                        <div className="section-header">
                            <h2><PhoneAlt /> Get Started Today</h2>
                            <p>Join thousands of people who are enjoying stress-free financial management.</p>
                        </div>

                        <div className="cta-buttons">
                            <a href={`tel:${config.phone}`} className="cta-button-large phone-button">
                                <PhoneAlt /> Call: {config.phone}
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
                                    <Globe /> Play Store
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
                                    <HandHoldingUsd />
                                </div>
                                CoopHub
                            </div>
                            <p>A product of <a href="http://www.underdecanopy.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gray)', textDecoration: 'underline' }}>Underdecanopy Digital Hub</a></p>
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
                            <a href={config.socials.tiktok} aria-label="Follow us on Tiktok"><Globe /></a>
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
                    padding: 80px 0;
                    background-color: var(--dark);
                    color: var(--white);
                }
                .contact-methods {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 2rem;
                    margin-bottom: 3rem;
                }
                .contact-method {
                    text-align: center;
                    padding: 2rem;
                    background-color: #444444;
                    border-radius: 8px;
                }
                .contact-icon {
                    width: 50px;
                    height: 50px;
                    background-color: var(--accent);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1rem;
                    color: var(--white);
                    font-size: 1.2rem;
                }
                .contact-method a {
                    color: var(--light-blue);
                    text-decoration: none;
                }
                .get-started {
                    padding: 100px 0;
                    background: linear-gradient(135deg, var(--primary) 0%, var(--light-blue) 100%);
                    color: var(--white);
                    position: relative;
                    overflow: hidden;
                }
                .get-started::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
                    z-index: 1;
                }
                .get-started .container {
                    position: relative;
                    z-index: 2;
                }
                .section-header {
                    text-align: center;
                    margin-bottom: 60px;
                }
                .section-header h2 {
                    font-size: 2.2rem;
                    font-weight: 700;
                    margin-bottom: 20px;
                    position: relative;
                    display: inline-block;
                }
                .section-header h2::after {
                    content: '';
                    position: absolute;
                    bottom: -10px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 80px;
                    height: 4px;
                    background-color: var(--accent);
                    border-radius: 2px;
                }
                .section-header p {
                    font-size: 1.2rem;
                    max-width: 600px;
                    margin: 0 auto;
                    opacity: 0.9;
                }
                .cta-buttons {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 30px;
                    margin-bottom: 60px;
                    flex-wrap: wrap;
                }
                .cta-button-large {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 16px 32px;
                    border-radius: 50px;
                    font-weight: 600;
                    font-size: 1.1rem;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                    position: relative;
                    overflow: hidden;
                    z-index: 1;
                }
                .cta-button-large::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 100%);
                    z-index: -1;
                    transition: opacity 0.3s ease;
                    opacity: 0;
                }
                .cta-button-large:hover::before {
                    opacity: 1;
                }
                .cta-button-large:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
                }
                .cta-button-large:active {
                    transform: translateY(-1px);
                }
                .cta-button-large i {
                    margin-right: 10px;
                    font-size: 1.2rem;
                }
                .phone-button {
                    background-color: var(--white);
                    color: var(--primary);
                }
                .whatsapp-button {
                    background-color: #25D366;
                    color: white;
                }
                .separator {
                    font-size: 1.2rem;
                    font-weight: 600;
                    opacity: 0.8;
                }
                .download-section {
                    text-align: center;
                }
                .download-section p {
                    font-size: 1.2rem;
                    margin-bottom: 30px;
                    opacity: 0.9;
                }
                .download-buttons {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    flex-wrap: wrap;
                }
                .download-button {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 14px 28px;
                    border-radius: 12px;
                    font-weight: 600;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    min-width: 180px;
                }
                .download-button:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
                }
                .download-button i {
                    margin-right: 10px;
                    font-size: 1.5rem;
                }
                .app-store {
                    background-color: #000;
                    color: white;
                }
                .play-store {
                    background-color: #0F9D58;
                    color: white;
                }
                .web-app {
                    background-color: #333;
                    color: white;
                }
                footer {
                    background-color: var(--dark);
                    color: var(--white);
                    padding: 3rem 0 1rem;
                }
                .footer-content {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 2rem;
                    margin-bottom: 2rem;
                }
                .footer-logo {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--white);
                    margin-bottom: 1rem;
                }
                .footer-links {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                .footer-links a {
                    color: var(--gray);
                    text-decoration: none;
                    transition: color 0.3s;
                }
                .footer-links a:hover {
                    color: var(--white);
                }
                .footer-social a {
                    color: var(--gray);
                    text-decoration: none;
                    margin-right: 1rem;
                    font-size: 1.5rem;
                }
                .footer-copyright {
                    text-align: center;
                    padding-top: 2rem;
                    border-top: 1px solid #444444;
                    color: var(--gray);
                }
                .whatsapp-float {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background-color: #25d366;
                    color: #fff;
                    border-radius: 50%;
                    width: 60px;
                    height: 60px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 2rem;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
                    z-index: 100;
                    transition: transform 0.3s;
                }
                .whatsapp-float:hover {
                    transform: scale(1.1);
                }
            `}</style>

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
                                    <ShieldAlt />
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
                                    <HandHoldingUsd />
                                </div>
                                <h3>Loan Access</h3>
                                <p>Quick access to loans based on your contributions without lengthy paperwork.</p>
                            </div>

                            <div className="feature-card">
                                <div className="feature-icon" aria-hidden="true">
                                    <MobileAlt />
                                </div>
                                <h3>100% Digital</h3>
                                <p>Complete digital experience accessible from anywhere on your mobile device.</p>
                            </div>

                            <div className="feature-card">
                                <div className="feature-icon" aria-hidden="true">
                                    <UserCheck />
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
                                    <p>Finalize your setup on the CoopHub platform. <strong style={{ color: "#FF0000" }}>For your security, we never see or store your NIN, BVN, or PIN.</strong> These are handled directly and securely by Wema Bank.</p>
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
                                    <UserShield />
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

                        <div className="faq-item">
                            <div className="faq-question" onClick={() => toggleFaq(0)}>
                                <strong>Is my money and personal data safe?</strong>
                            </div>
                            {openFaq === 0 && (
                                <div className="faq-answer">
                                    <p>Yes. CoopHub is powered by a platform operated by Wema Bank, a licensed financial institution. Your most sensitive data (NIN, BVN) is collected, encrypted, and stored directly by Wema Bank under their stringent security controls. Our own privacy policy excludes this data.</p>
                                </div>
                            )}
                        </div>

                        <div className="faq-item">
                            <div className="faq-question" onClick={() => toggleFaq(1)}>
                                <strong>Are there any hidden fees?</strong>
                            </div>
                            {openFaq === 1 && (
                                <div className="faq-answer">
                                    <p>CoopHub is built on transparency. All applicable platform or transaction fees will be clearly displayed to you before you confirm any transaction. There are no hidden charges.</p>
                                </div>
                            )}
                        </div>

                        <div className="faq-item">
                            <div className="faq-question" onClick={() => toggleFaq(2)}>
                                <strong>Can I get my money back if I need it?</strong>
                            </div>
                            {openFaq === 2 && (
                                <div className="faq-answer">
                                    <p>Yes. You have two levels of access:<br />
                                        1. <strong>Wallet Savings:</strong> You can withdraw these at any time, no permission needed.<br />
                                        2. <strong>Fee Contributions:</strong> You can submit a refund request, which we process back to your wallet within <strong>24-48 business hours.</strong> You can then withdraw it.</p>
                                </div>
                            )}
                        </div>

                        <div className="faq-item">
                            <div className="faq-question" onClick={() => toggleFaq(3)}>
                                <strong>Who can join CoopHub?</strong>
                            </div>
                            {openFaq === 3 && (
                                <div className="faq-answer">
                                    <p>CoopHub is open to everyone! Students, entrepreneurs, salary earners, and anyone who believes in community savings and digital transformation. Our platform is designed to be inclusive and accessible to all.</p>
                                </div>
                            )}
                        </div>

                        <div className="faq-item">
                            <div className="faq-question" onClick={() => toggleFaq(4)}>
                                <strong>How quickly can I access loans?</strong>
                            </div>
                            {openFaq === 4 && (
                                <div className="faq-answer">
                                    <p>Once you've built up sufficient contributions in your cooperative account, you can apply for loans that are typically processed within 24-48 hours. The amount you can borrow is based on your savings history and contribution level.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                <section className="contact" id="contact">
                    <div className="container">
                        <h2 className="section-title section-title-light">We're Here to Help</h2>
                        <p style={{ textAlign: 'center', marginBottom: '3rem', color: 'var(--gray)' }}>Can't find what you're looking for? Reach out to our support team.</p>

                        <div className="contact-methods">
                            <div className="contact-method">
                                <div className="contact-icon" aria-hidden="true"><Envelope /></div>
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

                        <div style={{ backgroundColor: '#222222', padding: '1.5rem', borderRadius: '5px', borderLeft: '4px solid var(--primary)' }}>
                            <p style={{ color: 'var(--gray)', margin: 0 }}><strong>Security Note:</strong> For your protection, please never send sensitive information like your NIN, BVN, or wallet PIN via email or social media. These details are only collected securely within the CoopHub app.</p>
                        </div>
                    </div>
                </section>

                <section className="get-started" id="get-started">
                    <div className="container">
                        <div className="section-header">
                            <h2><PhoneAlt /> Get Started Today</h2>
                            <p>Join thousands of people who are enjoying stress-free financial management.</p>
                        </div>

                        <div className="cta-buttons">
                            <a href={`tel:${config.phone}`} className="cta-button-large phone-button">
                                <PhoneAlt /> Call: {config.phone}
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
                                    <Globe /> Play Store
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
                                    <HandHoldingUsd />
                                </div>
                                CoopHub
                            </div>
                            <p>A product of <a href="http://www.underdecanopy.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gray)', textDecoration: 'underline' }}>Underdecanopy Digital Hub</a></p>
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
                            <a href={config.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook"><Facebook /></a>
                            <a href={config.socials.twitter} target="_blank" rel="noopener noreferrer" aria-label="Follow us on Twitter"><Twitter /></a>
                            <a href={config.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram"><Instagram /></a>
                            <a href={config.socials.youtube} target="_blank" rel="noopener noreferrer" aria-label="Follow us on YouTube"><Youtube /></a>
                            <a href={config.socials.tiktok} target="_blank" rel="noopener noreferrer" aria-label="Follow us on Tiktok"><Globe /></a>
                        </div>
                    </div>
                    <div className="footer-copyright">
                        <p>&copy; <span id="copyright-year">2024</span> CoopHub. All rights reserved.</p>
                    </div>
                </div>
            </footer>

            <a href={`https://wa.me/${config.whatsAppNumber.replace('+', '')}?text=Hello%20CoopHub!%20I%20have%20an%20enquiry.`} className="whatsapp-float" aria-label="Chat on WhatsApp" target="_blank" rel="noopener">
                <MessageCircle />
            </a>
        </>
    );
}
