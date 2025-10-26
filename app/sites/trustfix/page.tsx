import React from 'react';

const TrustFixPage = () => {
  return (
    <div>
      <header>
        <h1>TrustFix</h1>
        <p>Your Trusted Repair and Maintenance Platform</p>
      </header>

      <section className="hero">
        <h2>Trust-Based Repair Services</h2>
        <p>Connect with verified professionals for all your repair and maintenance needs.</p>
        <button>Find a Professional</button>
      </section>

      <section className="features">
        <h3>Why Choose TrustFix?</h3>
        <div className="features-grid">
          <div className="feature-card">
            <h4>Verified Professionals</h4>
            <p>All service providers are thoroughly vetted and verified.</p>
          </div>
          <div className="feature-card">
            <h4>Transparent Pricing</h4>
            <p>Get upfront quotes with no hidden charges.</p>
          </div>
          <div className="feature-card">
            <h4>Quality Guarantee</h4>
            <p>Every job is backed by our satisfaction guarantee.</p>
          </div>
          <div className="feature-card">
            <h4>24/7 Support</h4>
            <p>Round-the-clock customer service for your peace of mind.</p>
          </div>
          <div className="feature-card">
            <h4>Easy Booking</h4>
            <p>Schedule repairs in just a few clicks.</p>
          </div>
          <div className="feature-card">
            <h4>Secure Payments</h4>
            <p>Safe and secure payment processing.</p>
          </div>
        </div>
      </section>

      <section className="contact-form">
        <h3>Get In Touch</h3>
        <form>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
          
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
          
          <label htmlFor="service">Service Needed:</label>
          <input type="text" id="service" name="service" required />
          
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" rows={5} required></textarea>
          
          <button type="submit">Submit Request</button>
        </form>
      </section>

      <style jsx>{`;
        div {
          font-family: Arial, sans-serif;
        }
        header {
          background: linear-gradient(135deg, #4a148c 0%, #7b1fa2 100%);
          color: white;
          padding: 2rem;
          text-align: center;
        }
        .hero {
          padding: 3rem 1rem;
          text-align: center;
          background: #f5f5f5;
        }
        .hero button {
          background: #4a148c;
          color: white;
          padding: 1rem 2rem;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem;
          margin-top: 1rem;
        }
        .features {
          padding: 3rem 1rem;
        }
        .features h3 {
          text-align: center;
          margin-bottom: 2rem;
          color: #4a148c;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .feature-card {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .feature-card h4 {
          color: #4a148c;
          margin-bottom: 0.5rem;
        }
        .contact-form {
          padding: 3rem 1rem;
          background: #f9f9f9;
          max-width: 600px;
          margin: 0 auto;
        }
        .contact-form h3 {
          text-align: center;
          color: #4a148c;
          margin-bottom: 2rem;
        }
        form {
          display: flex;
          flex-direction: column;
        }
        label {
          margin-top: 1rem;
          font-weight: bold;
          color: #333;
        }
        input, textarea {
          padding: 0.75rem;
          margin-top: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 1rem;
        }
        button[type="submit"] {
          margin-top: 1.5rem;
          background: #4a148c;
          color: white;
          padding: 1rem;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem;
        }
        button:hover {
          opacity: 0.9;
        }
      `}</style>
    </div>
  );
};

export default TrustFixPage;