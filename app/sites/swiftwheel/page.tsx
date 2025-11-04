'use client';

import React from 'react';
// import { Navigation } from './_components/Navigation';

const SwiftWheelLandingPage = () => {
  return (
    <div>
      {/* <Navigation /> */}
      {/* Hero Section */}
      <section className="hero bg-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">CAC Registration & Corporate Compliance Services</h2>
            <p className="text-lg mb-8">Your trusted partner for seamless registration and compliance.</p>
            <button className="bg-white text-blue-800 px-6 py-3 rounded shadow font-semibold hover:bg-gray-100 transition">Get Started</button>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="features py-16 bg-gray-100">
        <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold mb-12 text-center">Our Features</h3>
            <div className="grid md:grid-cols-3 gap-10">
              <div className="feature-card bg-white p-6 rounded-lg shadow-md">Feature 1: Easy Registration</div>
              <div className="feature-card bg-white p-6 rounded-lg shadow-md">Feature 2: Compliance Monitoring</div>
              <div className="feature-card bg-white p-6 rounded-lg shadow-md">Feature 3: Expert Support</div>
              <div className="feature-card bg-white p-6 rounded-lg shadow-md">Feature 4: Document Management</div>
              <div className="feature-card bg-white p-6 rounded-lg shadow-md">Feature 5: Secure Transactions</div>
              <div className="feature-card bg-white p-6 rounded-lg shadow-md">Feature 6: Custom Solutions</div>
            </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-16">
        <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold mb-12 text-center">Contact Us</h3>
            <form className="max-w-xl mx-auto">
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Name</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Your name" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="email">Email</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Your email" />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="message">Message</label>
                    <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="message" placeholder="Your message"></textarea>
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Send
                    </button>
                </div>
            </form>
        </div>
      </section>
    </div>
  );
};

export default SwiftWheelLandingPage;
