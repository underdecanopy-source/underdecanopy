'use client';

import ContactForm from '@/components/ContactForm';
import { Navigation } from './_components/Navigation';

export default function CoopHubLandingPage() {
  return (
    <div>
      <Navigation />
      <section className="hero bg-green-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Your Cooperative Solutions</h2>
            <p className="text-lg mb-8">Empowering cooperatives with the tools they need.</p>
        </div>
      </section>
      <section id="features" className="features py-16 bg-gray-100">
        <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold mb-12 text-center">Features</h3>
            <div className="grid md:grid-cols-3 gap-10">
              <div className="feature-card bg-white p-6 rounded-lg shadow-md">Member Management</div>
              <div className="feature-card bg-white p-6 rounded-lg shadow-md">Financial Reporting</div>
              <div className="feature-card bg-white p-6 rounded-lg shadow-md">Secure Transactions</div>
              <div className="feature-card bg-white p-6 rounded-lg shadow-md">Mobile Access</div>
              <div className="feature-card bg-white p-6 rounded-lg shadow-md">Loan Management</div>
              <div className="feature-card bg-white p-6 rounded-lg shadow-md">Analytics Dashboard</div>
            </div>
        </div>
      </section>
      <section id="contact" className="contact py-16">
        <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold mb-12 text-center">Contact Us</h3>
            <ContactForm purpose="coophub" />
        </div>
      </section>
    </div>
  );
}