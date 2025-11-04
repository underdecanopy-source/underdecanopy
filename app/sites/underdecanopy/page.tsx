'use client';

import ContactForm from '@/components/ContactForm';
// import { Navigation } from './_components/Navigation';

export default function UnderdecanopyPage() {
  return (
    <div className="container">
      {/* <Navigation /> */}

      <section className="hero bg-gray-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Empowering Communities Through Digital Innovation</h2>
            <p className="text-lg mb-8">We are a technology company dedicated to building digital solutions that empower communities, cooperatives, and individuals across Africa.</p>
        </div>
      </section>

      <section id="products" className="products py-16 bg-gray-100">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Products</h2>
            <div className="grid md:grid-cols-3 gap-10">
              <div className="product-card bg-white p-6 rounded-lg shadow-md">
                <h3>CoopHub</h3>
                <p>Digital cooperative banking platform for transparent financial management</p>
                <a href="https://coophub.underdecanopy.com">Learn More →</a>
              </div>

              <div className="product-card bg-white p-6 rounded-lg shadow-md">
                <h3>ApplySmart</h3>
                <p>Automated scholarship and admission application platform</p>
                <a href="https://applysmart.underdecanopy.com">Learn More →</a>
              </div>

              <div className="product-card bg-white p-6 rounded-lg shadow-md">
                <h3>SmartTax</h3>
                <p>Digital tax assistant for simplified compliance</p>
                <a href="https://smarttax.underdecanopy.com">Learn More →</a>
              </div>

              <div className="product-card bg-white p-6 rounded-lg shadow-md">
                <h3>SwiftWheel</h3>
                <p>CAC registration and corporate compliance services</p>
                <a href="https://swiftwheel.underdecanopy.com">Learn More →</a>
              </div>

              <div className="product-card bg-white p-6 rounded-lg shadow-md">
                <h3>TechLift</h3>
                <p>Tech skills accelerator for the next generation</p>
                <a href="https://techlift.underdecanopy.com">Learn More →</a>
              </div>

              <div className="product-card bg-white p-6 rounded-lg shadow-md">
                <h3>TrustFix</h3>
                <p>Trust-based repair and maintenance platform</p>
                <a href="https://trustfix.underdecanopy.com">Learn More →</a>
              </div>
            </div>
        </div>
      </section>

      <section id="contact" className="contact py-16">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Get In Touch</h2>
            <p className="text-center mb-10 text-gray-600">Have questions or want to learn more about our products? Contact us below.</p>
            <ContactForm purpose="General Inquiry" />
        </div>
      </section>
    </div>
  );
}