'use client';

import { useState, useEffect } from 'react';
import { Shield, HandHelping, Mail, GraduationCap, Users, ChartLine, Smartphone, UserCheck, Clock, Lock, Fingerprint, ShieldCheck, Globe, Apple, MessageCircle, Store } from 'lucide-react';
import { FullContactSection } from '@/components/contact/FullContactSection';
import { MobileOptimizedFooter } from '@/components/contact/MobileOptimizedFooter';
import { Navigation } from "@/components/Navigation";
import Link from 'next/link';

const config = {
    whatsAppNumber: "+2348064852108",
    email: "underdecanopy@gmail.com",
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
        answer: "Yes. You have two levels of access:\n\n1. Wallet Savings: You can withdraw these at any time, no permission needed.\n\n2. Fee Contributions: You can submit a refund request, which we process back to your wallet within 24-48 business hours. You can then withdraw it."
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

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };
    
    useEffect(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
        return () => {
            document.documentElement.style.scrollBehavior = 'auto';
        };
    }, []);

    return (
        <div>
            <Navigation />
            <main>
                <section className="bg-blue-900 text-white section-lg" id="home">
                    <div className="page-container text-center">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Your Secure Digital Platform for Education & Cooperative Finance</h1>
                        <p className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 max-w-3xl mx-auto">Underdecanopy CoopHub is the secure, transparent platform for managing school fees and cooperative services, powered by Wema Bank.</p>
                        
                        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8">
                            <button
                                className={`px-4 md:px-6 py-2 md:py-3 text-sm md:text-base font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 active:scale-95 ${activeProduct === 'school-fees' ? 'bg-orange-500 text-white shadow-lg' : 'bg-white text-blue-900 hover:bg-gray-50'}`}
                                onClick={() => setActiveProduct('school-fees')}
                            >
                                School Fee Management
                            </button>
                            <button
                                className={`px-4 md:px-6 py-2 md:py-3 text-sm md:text-base font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 active:scale-95 ${activeProduct === 'cooperative' ? 'bg-orange-500 text-white shadow-lg' : 'bg-white text-blue-900 hover:bg-gray-50'}`}
                                onClick={() => setActiveProduct('cooperative')}
                            >
                                Cooperative Services
                            </button>
                        </div>

                        <Link href="#get-started" className="bg-orange-500 text-white py-3 px-8 rounded-full text-lg hover:bg-orange-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 active:scale-95 inline-block">
                            Get Started Today
                        </Link>
                    </div>
                </section>

                <section className="section" id="products">
                    <div className="page-container">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Products</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white p-8 rounded-lg shadow-md">
                                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-900 mx-auto mb-6">
                                    <GraduationCap size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-center mb-4">School Fee Management</h3>
                                <p className="text-gray-600 mb-4 text-center">Secure, gradual savings for school fees with complete transparency and financial discipline.</p>
                                <ul className="space-y-2 text-gray-600">
                                    <li className="flex items-center gap-3"><ShieldCheck className="text-green-500" /> Gradual savings for stress-free fee payment</li>
                                    <li className="flex items-center gap-3"><ShieldCheck className="text-green-500" /> Complete transaction transparency</li>
                                    <li className="flex items-center gap-3"><ShieldCheck className="text-green-500" /> Withdraw wallet savings anytime</li>
                                    <li className="flex items-center gap-3"><ShieldCheck className="text-green-500" /> Secure platform powered by Wema Bank</li>
                                </ul>
                            </div>

                            <div className="bg-white p-8 rounded-lg shadow-md">
                                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-900 mx-auto mb-6">
                                    <Users size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-center mb-4">Cooperative Services</h3>
                                <p className="text-gray-600 mb-4 text-center">Digital cooperative for savings, contributions, and loan access with full banking security.</p>
                                <ul className="space-y-2 text-gray-600">
                                    <li className="flex items-center gap-3"><ShieldCheck className="text-green-500" /> Easy weekly/monthly contributions</li>
                                    <li className="flex items-center gap-3"><ShieldCheck className="text-green-500" /> Instant cooperative loan access</li>
                                    <li className="flex items-center gap-3"><ShieldCheck className="text-green-500" /> Wema Bank verified wallet</li>
                                    <li className="flex items-center gap-3"><ShieldCheck className="text-green-500" /> 100% paperless & mobile friendly</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-gray-100 py-16" id="features">
                    <div className="page-container">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose CoopHub?</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { icon: <Shield />, title: "Bank-Grade Security", description: "Your data is protected with full digital footprints. Sensitive information is handled directly by Wema Bank." },
                                { icon: <ChartLine />, title: "Financial Discipline", description: "Ditch the last-minute panic. Save gradually and build healthy financial habits." },
                                { icon: <HandHelping />, title: "Loan Access", description: "Quick access to loans based on your contributions without lengthy paperwork." },
                                { icon: <Smartphone />, title: "100% Digital", description: "Complete digital experience accessible from anywhere on your mobile device." },
                                { icon: <UserCheck />, title: "KYC Compliant", description: "Fully regulated and compliant with all financial regulations for your peace of mind." },
                                { icon: <Clock />, title: "24/7 Access", description: "Manage your finances anytime, anywhere with our always-available platform." }
                            ].map(feature => (
                                <div key={feature.title} className="bg-white p-6 rounded-lg shadow-md text-center">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-900 mx-auto mb-4">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section" id="how-it-works">
                    <div className="page-container">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How It Works</h2>

                        <div className="max-w-4xl mx-auto">
                            <div className="space-y-4">
                                {[
                                    { title: "Direct Message Us", description: <>Send your <strong>Full Name, Email Address, and Phone Number</strong> to our official channels on Instagram or WhatsApp <strong>{config.whatsAppNumber}</strong>.</> },
                                    { title: "Download the CoopHub App", description: <>Get the app from the Google Play Store, Apple App Store, or access it via the web.</> },
                                    { title: "Register & Log In", description: <>Use the secure login credentials sent to your email to access your account.</> },
                                    { title: "Complete Your KYC", description: <>Finalize your setup on the CoopHub platform. <strong className="text-red-600">For your security, we never see or store your NIN, BVN, or PIN.</strong> These are handled directly and securely by Wema Bank.</> },
                                    { title: "Start Saving & Access Loans", description: <>Begin making contributions and access loans based on your savings.</> }
                                ].map((step, index) => (
                                    <div key={index} className="flex items-start gap-4">
                                        <div className="flex-shrink-0 h-10 w-10 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold">{index + 1}</div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
                                            <p className="text-gray-600">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-blue-900 text-white py-16" id="security">
                    <div className="page-container">
                        <h2 className="text-3xl font-bold text-center mb-12">Your Security Is Our Priority</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { icon: <Lock />, title: "Bank-Level Encryption", description: "All data is encrypted using industry-standard protocols." },
                                { icon: <Shield />, title: "Wema Bank Backed", description: "Powered by CoopHub, a platform operated by Wema Bank." },
                                { icon: <Fingerprint />, title: "Secure KYC Process", description: "Sensitive data handled directly by Wema Bank under their security controls." },
                                { icon: <ShieldCheck />, title: "Regulatory Compliance", description: "Fully registered and compliant with financial regulations." }
                            ].map(item => (
                                <div key={item.title} className="text-center">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-white text-blue-900 mx-auto mb-4">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                                    <p className="opacity-80">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section" id="faq">
                    <div className="page-container">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Frequently Asked Questions</h2>
                        <div className="space-y-4 max-w-3xl mx-auto">
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
                                            <div className="p-4 bg-white min-h-20">
                                                <p className="text-gray-600 whitespace-pre-line">{faq.answer}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section-lg bg-blue-900 text-white" id="get-started">
                    <div className="page-container text-center">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Get Started Today</h2>
                        <p className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">Join thousands of people who are enjoying stress-free financial management.</p>
                        
                        <div>
                            <p className="mb-4 text-base md:text-lg">Download the app now and begin managing your finances.</p>
                            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                                <a href={config.appLinks.apple} className="bg-black text-white py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-gray-800 text-sm md:text-base">
                                    <Apple className="w-5 h-5" /> App Store
                                </a>
                                <a href={config.appLinks.google} className="bg-white text-black py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-gray-200 text-sm md:text-base">
                                    <Store className="w-5 h-5" /> Play Store
                                </a>
                                <a href={config.appLinks.web} className="bg-gray-600 text-white py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-gray-700 text-sm md:text-base">
                                    <Globe className="w-5 h-5" /> Web App
                                </a>
                            </div>
                        </div>
                        <div className="bg-gray-900 p-4 rounded-lg border-l-4 border-orange-500 max-w-3xl mx-auto mt-8">
                            <p className="text-gray-300"><strong>Security Note:</strong> For your protection, please never send sensitive information like your NIN, BVN, or wallet PIN via email or social media. These details are only collected securely within the CoopHub app.</p>
                        </div>
                    </div>
                </section>
            </main>

            <FullContactSection
                title="Contact Us"
                subtitle="Start your journey to financial freedom"
                serviceOptions={[
                    { value: "School Fee Management", label: "School Fee Management" },
                    { value: "Cooperative Services", label: "Cooperative Services" },
                    { value: "Loan Access", label: "Loan Access" },
                    { value: "Other", label: "Other" },
                ]}
            />

            <MobileOptimizedFooter serviceName="CoopHub" showQuickContact={false} />
        </div>
    );
}
