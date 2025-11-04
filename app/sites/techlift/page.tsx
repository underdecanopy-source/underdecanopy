'use client';

import React from 'react';
import { Navigation } from './_components/Navigation';

const TechLiftPage = () => {
  return (
    <div>
      <Navigation />
      <section className="hero bg-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Accelerate Your Tech Skills</h2>
            <p className="text-lg mb-8">Join our TechLift program and enhance your abilities in technology.</p>
        </div>
      </section>
      <section id="features" className="features py-16 bg-gray-100">
        <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold mb-12 text-center">Features</h3>
            <div className="grid md:grid-cols-3 gap-10">
              <div className="feature-card bg-white p-6 rounded-lg shadow-md">
                <h4>Feature 1</h4>
                <p>Description of feature 1.</p>
              </div>
              <div className="feature-card bg-white p-6 rounded-lg shadow-md">
                <h4>Feature 2</h4>
                <p>Description of feature 2.</p>
              </div>
              <div className="feature-card bg-white p-6 rounded-lg shadow-md">
                <h4>Feature 3</h4>
                <p>Description of feature 3.</p>
              </div>
              <div className="feature-card bg-white p-6 rounded-lg shadow-md">
                <h4>Feature 4</h4>
                <p>Description of feature 4.</p>
              </div>
              <div className="feature-card bg-white p-6 rounded-lg shadow-md">
                <h4>Feature 5</h4>
                <p>Description of feature 5.</p>
              </div>
              <div className="feature-card bg-white p-6 rounded-lg shadow-md">
                <h4>Feature 6</h4>
                <p>Description of feature 6.</p>
              </div>
            </div>
        </div>
      </section>
      <section id="contact" className="contact-form py-16">
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
                    <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Send
                    </button>
                </div>
            </form>
        </div>
      </section>
    </div>
  );
};

export default TechLiftPage;
