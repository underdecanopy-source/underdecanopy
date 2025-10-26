// pages/techlift/page.tsx

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
          {[...Array(6)].map((_, index) => (
            <div className="feature-card" key={index}>
              <h4>Feature {index + 1}</h4>
              <p>Description of feature {index + 1}.</p>
            </div>
          ))}
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

export default TechLiftPage;