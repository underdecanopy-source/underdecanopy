'use client';

import React from 'react';
// import { Navigation } from './_components/Navigation';

const TrustFixPage = () => {
  return (
    <div>
      {/* <Navigation /> */}

      <section className="hero bg-purple-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Trust-Based Repair Services</h2>
            <p className="text-lg mb-8">Connect with verified professionals for all your repair and maintenance needs.</p>
            <button className="bg-white text-purple-800 px-6 py-3 rounded shadow font-semibold hover:bg-gray-100 transition">Find a Professional</button>
        </div>
      </section>

      <section id="features" className="features py-16 bg-gray-100">
        <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold mb-12 text-center">Why Choose TrustFix?</h3>
            <div className="grid md:grid-cols-3 gap-10">
              <div className="feature-card bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-bold text-xl mb-2">Verified Professionals</h4>
                <p>All service providers are thoroughly vetted and verified.</p>
              </div>
              <div className="feature-card bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-bold text-xl mb-2">Transparent Pricing</h4>
                <p>Get upfront quotes with no hidden charges.</p>
              </div>
              <div className="feature-card bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-bold text-xl mb-2">Quality Guarantee</h4>
                <p>Every job is backed by our satisfaction guarantee.</p>
              </div>
              <div className="feature-card bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-bold text-xl mb-2">24/7 Support</h4>
                <p>Round-the-clock customer service for your peace of mind.</p>
              </div>
              <div className="feature-card bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-bold text-xl mb-2">Easy Booking</h4>
                <p>Schedule repairs in just a few clicks.</p>
              </div>
              <div className="feature-card bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-bold text-xl mb-2">Secure Payments</h4>
                <p>Safe and secure payment processing.</p>
              </div>
            </div>
        </div>
      </section>

      <section id="contact" className="contact-form py-16">
        <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold mb-12 text-center">Get In Touch</h3>
            <form className="max-w-xl mx-auto">
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
                <input type="text" id="name" name="name" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email:</label>
                <input type="email" id="email" name="email" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-4">
                <label htmlFor="service" className="block text-gray-700 font-bold mb-2">Service Needed:</label>
                <input type="text" id="service" name="service" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message:</label>
                <textarea id="message" name="message" rows={5} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
              </div>
              <button type="submit" className="bg-purple-800 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit Request</button>
            </form>
        </div>
      </section>
    </div>
  );
};

export default TrustFixPage;