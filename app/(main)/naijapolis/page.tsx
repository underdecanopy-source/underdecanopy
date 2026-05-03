'use client';

import { FullContactSection } from '@/components/contact/FullContactSection';
import { MobileOptimizedFooter } from '@/components/contact/MobileOptimizedFooter';
import { Navigation } from '@/components/Navigation';

export default function NaijaPolisPage() {
  return (
    <div>
      <Navigation />

      <main>
        {/* Hero Section */}
        <section className="bg-green-700 text-white py-12 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">NaijaPolis: Empowering Nigerian Political Campaigns</h2>
            <p className="text-lg mb-6 max-w-3xl mx-auto">
              A comprehensive, modular, open-source political campaign management platform specifically engineered for Nigerian electoral conditions. Track real-time activities, manage finances, and empower field operations effortlessly.
            </p>
            <a href="https://wa.me/2348064852108" className="bg-white text-green-700 px-6 py-3 rounded shadow font-semibold hover:bg-gray-100 transition">
              Request a Demo
            </a>
          </div>
        </section>

        {/* Features Section */}
        <section className="section bg-gray-50" id="features">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold mb-12">Core Capabilities</h3>
            <div className="grid md:grid-cols-3 gap-10">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-green-600 text-4xl mb-4"><span aria-hidden="true">📊</span></div>
                <h4 className="font-bold text-xl mb-2">Live Activity Stream</h4>
                <p className="text-gray-600">Track real-time campaign activities, donations, volunteer signups, and canvassing updates across your entire organization.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-green-600 text-4xl mb-4"><span aria-hidden="true">💰</span></div>
                <h4 className="font-bold text-xl mb-2">Finance Management</h4>
                <p className="text-gray-600">Manage campaign war chests, track pledges, monitor fundraisiers, and securely integrate with local payment gateways like Paystack and Flutterwave.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-green-600 text-4xl mb-4"><span aria-hidden="true">🗺️</span></div>
                <h4 className="font-bold text-xl mb-2">Field Canvassing & USSD</h4>
                <p className="text-gray-600">Equip field agents with offline USSD sync and polling unit registry tracking, perfectly tailored for local logistics and connectivity constraints.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Analytics Section */}
        <section className="section bg-white" id="analytics">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold mb-12">Built for Scale and Transparency</h3>
            <div className="grid md:grid-cols-2 gap-10 text-left items-center">
              <div>
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 text-xl">✓</span>
                    <div>
                      <h4 className="font-bold text-lg">Goal Tracking</h4>
                      <p className="text-gray-600">Set, monitor, and achieve targets for voter outreach, funds raised, and volunteer recruitment.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 text-xl">✓</span>
                    <div>
                      <h4 className="font-bold text-lg">People Database</h4>
                      <p className="text-gray-600">Maintain an organized, robust CRM of staff, volunteers, donors, and potential voters across the country.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 text-xl">✓</span>
                    <div>
                      <h4 className="font-bold text-lg">Advocacy & Outreach</h4>
                      <p className="text-gray-600">Log constituent feedback, monitor support levels (strong, neutral, opposed), and drive effective policy messaging.</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-100 p-8 rounded-xl flex items-center justify-center">
                 <div className="text-center">
                   <span className="text-6xl" aria-hidden="true">📈</span>
                   <p className="mt-4 font-semibold text-gray-700">Data-Driven Campaigns</p>
                 </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FullContactSection />
      <MobileOptimizedFooter />
    </div>
  );
}
