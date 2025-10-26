import React from 'react';

const SwiftWheelLandingPage = () => {
  return (
    <div>
      {/* Header */}
      <header>
        <h1>Welcome to SwiftWheel</h1>
        <nav>
          <ul>
            <li><a href="#features">Features</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h2>CAC Registration & Corporate Compliance Services</h2>
        <p>Your trusted partner for seamless registration and compliance.</p>
        <button>Get Started</button>
      </section>

      {/* Features Grid */}
      <section id="features">
        <h3>Our Features</h3>
        <div className="features-grid">
          <div className="feature-card">Feature 1: Easy Registration</div>
          <div className="feature-card">Feature 2: Compliance Monitoring</div>
          <div className="feature-card">Feature 3: Expert Support</div>
          <div className="feature-card">Feature 4: Document Management</div>
          <div className="feature-card">Feature 5: Secure Transactions</div>
          <div className="feature-card">Feature 6: Custom Solutions</div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact">
        <h3>Contact Us</h3>
        <form>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
          
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
          
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" required></textarea>
          
          <button type="submit">Send</button>
        </form>
      </section>
    </div>
  );
};

export default SwiftWheelLandingPage;