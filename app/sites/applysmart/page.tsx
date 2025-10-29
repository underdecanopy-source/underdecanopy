'use client';

import React from 'react';
import { Navigation } from './_components/Navigation';

const ApplySmartPage = () => {
    return (
        <div>
            <Navigation />
            <section className="hero bg-blue-600 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-4">Your Gateway to Scholarship Applications</h2>
                    <p className="text-lg mb-8">Streamline your scholarship application process with our innovative platform.</p>
                    <button className="bg-white text-blue-600 px-6 py-3 rounded shadow font-semibold hover:bg-gray-100 transition">Get Started</button>
                </div>
            </section>
            <section id="features" className="features py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h3 className="text-3xl font-bold mb-12 text-center">Features</h3>
                    <div className="grid md:grid-cols-3 gap-10">
                        <div className="feature-card bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold mb-2">Automated Application Tracking</h3>
                            <p className="text-gray-600">Keep track of your applications effortlessly.</p>
                        </div>
                        <div className="feature-card bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold mb-2">Personalized Recommendations</h3>
                            <p className="text-gray-600">Get recommendations tailored to your profile.</p>
                        </div>
                        <div className="feature-card bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold mb-2">Document Management</h3>
                            <p className="text-gray-600">Store and manage your documents securely.</p>
                        </div>
                        <div className="feature-card bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold mb-2">Deadline Alerts</h3>
                            <p className="text-gray-600">Never miss a scholarship deadline again.</p>
                        </div>
                        <div className="feature-card bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold mb-2">Expert Guidance</h3>
                            <p className="text-gray-600">Access resources and tips from experts.</p>
                        </div>
                        <div className="feature-card bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold mb-2">Community Support</h3>
                            <p className="text-gray-600">Join a community of applicants for support.</p>
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
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default ApplySmartPage;
