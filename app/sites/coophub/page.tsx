'use client';

import ContactForm from '@/components/ContactForm';

export default function CoopHubLandingPage() {
  return (
    <div>
      <header className="header">
        <h1>Welcome to CoopHub</h1>
      </header>
      <section className="hero">
        <h2>Your Cooperative Solutions</h2>
        <p>Empowering cooperatives with the tools they need.</p>
      </section>
      <section className="features">
        <h3>Features</h3>
        <div className="features-grid">
          <div className="feature-card">Member Management</div>
          <div className="feature-card">Financial Reporting</div>
          <div className="feature-card">Secure Transactions</div>
          <div className="feature-card">Mobile Access</div>
          <div className="feature-card">Loan Management</div>
          <div className="feature-card">Analytics Dashboard</div>
        </div>
      </section>
      <section className="contact">
        <h3>Contact Us</h3>
        <ContactForm purpose="coophub" />
      </section>
      <style jsx>{`
        .header {
          background: linear-gradient(#2c5530, #4a7c4e);
          color: white;
          padding: 20px;
          text-align: center;
        }
        .hero {
          padding: 40px;
          text-align: center;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          padding: 20px;
        }
        .feature-card {
          background: #f0f0f0;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
        }
        .contact {
          padding: 40px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
