// pages/techlift/page.tsx

'use client';

import React from 'react';

const TechLiftPage = () => {
  return (
    <div>
      <header>
        <h1>TechLift</h1>
      </header>
      <section className="hero">
        <h2>Accelerate Your Tech Skills</h2>
        <p>Join our TechLift program and enhance your abilities in technology.</p>
      </section>
      <section className="features">
        <h3>Features</h3>
        <div className="features-grid">
          <div className="feature-card">
            <h4>Feature 1</h4>
            <p>Description of feature 1.</p>
          </div>
          <div className="feature-card">
            <h4>Feature 2</h4>
            <p>Description of feature 2.</p>
          </div>
          <div className="feature-card">
            <h4>Feature 3</h4>
            <p>Description of feature 3.</p>
          </div>
          <div className="feature-card">
            <h4>Feature 4</h4>
            <p>Description of feature 4.</p>
          </div>
          <div className="feature-card">
            <h4>Feature 5</h4>
            <p>Description of feature 5.</p>
          </div>
          <div className="feature-card">
            <h4>Feature 6</h4>
            <p>Description of feature 6.</p>
          </div>
        </div>
      </section>
      <section className="contact-form">
        <h3>Contact Us</h3>
        <form>
          <label>
            Name:
            <input type="text" name="name" required />
          </label>
          <label>
            Email:
            <input type="email" name="email" required />
          </label>
          <label>
            Message:
            <textarea name="message" required></textarea>
          </label>
          <button type="submit">Send</button>
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

export default TechLiftPage;
