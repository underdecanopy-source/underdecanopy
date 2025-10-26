'use client';

import React from 'react';

const SmartTaxLandingPage = () => {
  return (
    <div>
      <header>
        <h1>SmartTax</h1>
        <nav>
          <ul>
            <li>Home</li>
            <li>Features</li>
            <li>Contact</li>
          </ul>
        </nav>
      </header>

      <section className="hero">
        <h2>Your Guide to Tax Compliance</h2>
        <p>Streamline your tax filing with SmartTax.</p>
        <button>Get Started</button>
      </section>

      <section className="features">
        <h3>Features</h3>
        <div className="features-grid">
          <div className="feature-card">Feature 1: Easy Filing</div>
          <div className="feature-card">Feature 2: Compliance Tracking</div>
          <div className="feature-card">Feature 3: Automated Reminders</div>
          <div className="feature-card">Feature 4: Secure Data Storage</div>
          <div className="feature-card">Feature 5: Expert Support</div>
          <div className="feature-card">Feature 6: Tax Deduction Insights</div>
        </div>
      </section>

      <section className="contact-form">
        <h3>Contact Us</h3>
        <form>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit">Submit</button>
        </form>
      </section>
    </div>
  );
};

<style jsx>{`
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px;
  }
  .feature-card {
    background: #f0f0f0;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
  }
`}</style>

export default SmartTaxLandingPage;
