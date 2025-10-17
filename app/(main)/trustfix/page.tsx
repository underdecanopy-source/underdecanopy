import Script from 'next/script';

export default function TrustFixPage() {
  return (
    <>
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">TrustFix</h1>
          <span className="text-sm italic text-gray-500">Smart. Trustworthy. Fast.</span>
        </div>
      </header>

      <main className="bg-gray-50 text-gray-800">
        {/* Hero Section */}
        <section className="bg-blue-600 text-white py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-4">Find Verified Computer & Tech Experts — Fast.</h2>
            <p className="text-lg mb-6">Need repairs, device procurement, CCTV installations or regular maintenance? TrustFix connects you with certified professionals in minutes.</p>
            <a href="https://wa.me/2348064852108" className="bg-white text-blue-600 px-6 py-3 rounded shadow font-semibold hover:bg-gray-100 transition">Book a Technician Now</a>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-6 text-center">
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
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 text-center">
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
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-6 text-center">
            <h3 className="text-3xl font-bold mb-6">Are You a Skilled Technician?</h3>
            <p className="mb-6">Join TrustFix to access quality jobs, earn more, and grow your career. We offer branding, support, and even savings & financing options through our cooperative society.</p>
            <a href="https://forms.gle/your-google-form-link-here" className="bg-blue-600 text-white px-6 py-3 rounded shadow font-semibold hover:bg-blue-700 transition">Apply Now</a>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 text-center">
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

        {/* Contact & Feedback Form */}
        <section className="py-16 bg-gray-100" id="contact-form">
          <div className="container mx-auto px-6">
            <h3 className="text-3xl font-bold mb-6 text-center">Reach Out or Leave Feedback</h3>
            <p className="text-center mb-10 text-gray-600">Prefer not to call or use WhatsApp? You can message us right here. We&apos;ll respond within 1–2 hours.</p>
            <form action="YOUR_FORM_ENDPOINT" method="POST" className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Full Name</label>
                <input type="text" id="name" name="name" required className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email Address</label>
                <input type="email" id="email" name="email" required className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300" />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                <input type="tel" id="phone" name="phone" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300" />
              </div>
              <div className="mb-4">
                <label htmlFor="service" className="block text-gray-700 font-semibold mb-2">Service Interested In</label>
                <select id="service" name="service" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300">
                  <option value="">Select a service</option>
                  <option value="repairs">Computer Repairs</option>
                  <option value="cctv">CCTV Installation</option>
                  <option value="network">Network Setup</option>
                  <option value="procurement">Device Procurement</option>
                  <option value="web">Web Development</option>
                  <option value="training">Tech Training</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Your Message</label>
                <textarea id="message" name="message" rows={5} required className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"></textarea>
              </div>
              <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700 transition">Send Message</button>
            </form>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-20 bg-blue-600 text-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4"><span aria-hidden="true">📞</span> Get Help or Book a Technician</h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">Reach out to us now and enjoy fast, secure, and professional service.</p>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-6">
              <a href="tel:08064852108" className="px-8 py-4 bg-white text-blue-600 rounded-md hover:bg-opacity-90 transition text-center font-semibold text-lg flex items-center">
                <i className="fas fa-phone-alt mr-2"></i> Call: 080-6485-2108
              </a>
              <span className="text-white opacity-70">OR</span>
              <a href="https://wa.me/2348064852108" className="px-8 py-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition text-center font-semibold text-lg flex items-center">
                <i className="fab fa-whatsapp mr-2"></i> WhatsApp Us
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <a href="/" className="flex items-center space-x-2" aria-label="TrustFix Home">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20" role="img" aria-labelledby="footer-logo-title">
                  <title id="footer-logo-title">TrustFix Logo</title>
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"></path>
                </svg>
                <span className="text-xl font-bold">TrustFix</span>
              </a>
              <p className="mt-2 text-gray-400">Smart. Trustworthy. Fast.</p>
            </div>
            <div className="flex space-x-6">
              <a href="https://facebook.com/your-page" className="text-gray-400 hover:text-white transition" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="https://twitter.com/your-handle" className="text-gray-400 hover:text-white transition" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="https://instagram.com/your-handle" className="text-gray-400 hover:text-white transition" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="https://linkedin.com/your-page" className="text-gray-400 hover:text-white transition" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between">
            <p className="text-gray-400 mb-4 md:mb-0">© 2024 TrustFix. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a>
              <a href="#contact-form" className="text-gray-400 hover:text-white transition">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Font Awesome for icons */}
      <Script
        src="https://kit.fontawesome.com/a076d05399.js"
        crossOrigin="anonymous"
        strategy="lazyOnload"
      />
    </>
  );
}