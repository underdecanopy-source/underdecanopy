'use client';

import { FullContactSection } from '@/components/contact/FullContactSection';
import { MobileOptimizedFooter } from '@/components/contact/MobileOptimizedFooter';
import { Navigation } from '@/components/Navigation';

export default function TrustFixPage() {
  return (
    <div>
      <Navigation />

      <main>
        {/* Hero Section */}
        <section className="bg-blue-600 text-white py-12 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Find Verified Computer & Tech Experts — Fast.</h2>
            <p className="text-lg mb-6">Need repairs, device procurement, CCTV installations or regular maintenance? TrustFix connects you with certified professionals in minutes.</p>
            <a href="https://wa.me/2348064852108" className="bg-white text-blue-600 px-6 py-3 rounded shadow font-semibold hover:bg-gray-100 transition">Book a Technician Now</a>
          </div>
        </section>

        {/* How It Works */}
        <section className="section bg-gray-100" id="how-it-works">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold mb-12">How TrustFix Works</h3>
            <div className="grid md:grid-cols-3 gap-10">
              <div>
                <div className="text-blue-600 text-4xl mb-4"><span aria-hidden="true">📱</span></div>
                <h4 className="font-bold text-xl mb-2">Step 1: Make a Request</h4>
                <p>Use WhatsApp or our booking form to describe your issue or need.</p>
              </div>
              <div>
                <div className="text-blue-600 text-4xl mb-4"><span aria-hidden="true">🛠️</span></div>
                <h4 className="font-bold text-xl mb-2">Step 2: Get Matched</h4>
                <p>We connect you with a vetted technician closest to you, based on skill and availability.</p>
              </div>
              <div>
                <div className="text-blue-600 text-4xl mb-4"><span aria-hidden="true">✅</span></div>
                <h4 className="font-bold text-xl mb-2">Step 3: Job Done</h4>
                <p>Your issue is handled professionally. Pay securely and leave a review.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="section bg-white" id="services">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold mb-12">Our Core Services</h3>
            <div className="grid md:grid-cols-3 gap-10 text-left">
              <div className="bg-gray-50 p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-blue-600 hover:-translate-y-1">
                <h4 className="font-bold text-lg mb-2 text-blue-800"><span aria-hidden="true">💻</span> Computing & IT Support</h4>
                <p className="text-gray-600 text-sm">Repairs, upgrades, software installation, virus removal, and helpdesk support for all devices.</p>
              </div>
              <div className="bg-gray-50 p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-blue-600 hover:-translate-y-1">
                <h4 className="font-bold text-lg mb-2 text-blue-800"><span aria-hidden="true">🛠️</span> Preventive & Corrective Maintenance</h4>
                <p className="text-gray-600 text-sm">Routine checks and urgent fixes for homes, schools, and offices.</p>
              </div>
              <div className="bg-gray-50 p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-blue-600 hover:-translate-y-1">
                <h4 className="font-bold text-lg mb-2 text-blue-800"><span aria-hidden="true">🌐</span> Networking & Internet Solutions</h4>
                <p className="text-gray-600 text-sm">LAN/WLAN setup, router tuning, ISP support, VPNs and remote access services.</p>
              </div>
              <div className="bg-gray-50 p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-blue-600 hover:-translate-y-1">
                <h4 className="font-bold text-lg mb-2 text-blue-800"><span aria-hidden="true">💼</span> Hardware & Device Services</h4>
                <p className="text-gray-600 text-sm">Procurement and setup of laptops, printers, scanners, mobile repairs and more.</p>
              </div>
              <div className="bg-gray-50 p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-blue-600 hover:-translate-y-1">
                <h4 className="font-bold text-lg mb-2 text-blue-800"><span aria-hidden="true">🎥</span> Security & Surveillance</h4>
                <p className="text-gray-600 text-sm">CCTV installation, DVR/NVR setup, remote access, and biometric access control systems.</p>
              </div>
              <div className="bg-gray-50 p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-blue-600 hover:-translate-y-1">
                <h4 className="font-bold text-lg mb-2 text-blue-800"><span aria-hidden="true">🧑‍💼</span> Enterprise Tech Services</h4>
                <p className="text-gray-600 text-sm">Server deployments, database management, and inventory tracking solutions.</p>
              </div>
              <div className="bg-gray-50 p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-blue-600 hover:-translate-y-1">
                <h4 className="font-bold text-lg mb-2 text-blue-800"><span aria-hidden="true">🌐</span> Web & Digital Services</h4>
                <p className="text-gray-600 text-sm">Website development, hosting, social media management, SEO, and online branding.</p>
              </div>
              <div className="bg-gray-50 p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-blue-600 hover:-translate-y-1">
                <h4 className="font-bold text-lg mb-2 text-blue-800"><span aria-hidden="true">🎨</span> Graphics Design & Print</h4>
                <p className="text-gray-600 text-sm">Design and production of flyers, banners, logos, signage, and branding kits.</p>
              </div>
              <div className="bg-gray-50 p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-blue-600 hover:-translate-y-1">
                <h4 className="font-bold text-lg mb-2 text-blue-800"><span aria-hidden="true">🏫</span> Training & Support Services</h4>
                <p className="text-gray-600 text-sm">Basic computer literacy and team training for staff on key digital tools.</p>
              </div>
            </div>
          </div>
        </section>

        {/* For Technicians */}
        <section className="section bg-gray-100" id="technicians">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold mb-6">Are You a Skilled Technician?</h3>
            <p className="mb-6">Join TrustFix to access quality jobs, earn more, and grow your career. We offer branding, support, and even savings & financing options through our cooperative society.</p>
            <a href="https://wa.me/2348064852108?text=Hello! I am a skilled technician and I would like to join TrustFix." className="bg-blue-600 text-white px-6 py-3 rounded shadow font-semibold hover:bg-blue-700 transition">Apply Now</a>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section bg-white" id="testimonials">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold mb-12">What Clients Are Saying</h3>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="bg-gray-50 p-6 rounded shadow">
                <p className="mb-2">“TrustFix sent a technician to fix my laptop the same day. It was fast and affordable.”</p>
                <span className="font-bold">— Amina O., Business Owner</span>
              </div>
              <div className="bg-gray-50 p-6 rounded shadow">
                <p className="mb-2">“I got CCTV installed at home without stress. Professional service and neat job.”</p>
                <span className="font-bold">— John M., Engineer</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <FullContactSection
          title="Contact Us"
          subtitle="Reach out for tech support, repairs, or any inquiries"
          serviceOptions={[
            { value: "Computer Repairs", label: "Computer Repairs" },
            { value: "CCTV Installation", label: "CCTV Installation" },
            { value: "Network Setup", label: "Network Setup" },
            { value: "Device Procurement", label: "Device Procurement" },
            { value: "Web Development", label: "Web Development" },
            { value: "Tech Training", label: "Tech Training" },
            { value: "Other", label: "Other" },
          ]}
        />
      </main>

      <MobileOptimizedFooter serviceName="TrustFix" showQuickContact={false} />
      {/* Font Awesome for icons */}

    </div>
  );
}
