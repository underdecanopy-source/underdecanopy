/**
 * ContactSection Component
 * Comprehensive contact section for service pages
 * Mobile-optimized with easy-to-tap buttons
 */

'use client';

import { Phone, MessageCircle, Mail } from 'lucide-react';
import { CONTACT_CONFIG } from '@/lib/config/contact';

interface ContactSectionProps {
  title?: string;
  subtitle?: string;
}

export function ContactSection({
  title = "Get in Touch",
  subtitle = "We're here to help. Reach out to us today!",
}: ContactSectionProps) {
  return (
    <section className="py-8 md:py-12 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="page-container">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-5xl mx-auto">
          {/* Phone */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 w-full" style={{ minHeight: '200px' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0" style={{ width: '3rem', height: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Call Us</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Speak directly with our team
            </p>
            <a
              href={CONTACT_CONFIG.getPhoneLink()}
              className="flex w-full text-center bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95"
              style={{ minHeight: '3rem', flexShrink: 0, whiteSpace: 'nowrap', alignItems: 'center', justifyContent: 'center' }}
            >
              {CONTACT_CONFIG.phoneDisplay}
            </a>
          </div>

          {/* WhatsApp */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 w-full" style={{ minHeight: '200px' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 p-3 rounded-lg flex-shrink-0" style={{ width: '3rem', height: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">WhatsApp</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Quick chat on WhatsApp
            </p>
            <a
              href={CONTACT_CONFIG.getWhatsAppLink(CONTACT_CONFIG.quickMessages.inquiry)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full text-center bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 active:scale-95"
              style={{ minHeight: '3rem', flexShrink: 0, whiteSpace: 'nowrap', alignItems: 'center', justifyContent: 'center' }}
            >
              Message Us
            </a>
          </div>

          {/* Email */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 w-full" style={{ minHeight: '200px' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-orange-100 p-3 rounded-lg flex-shrink-0" style={{ width: '3rem', height: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Mail className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Email</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Send us a detailed message
            </p>
            <a
              href={CONTACT_CONFIG.getEmailLink()}
              className="flex w-full text-center bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 active:scale-95"
              style={{ minHeight: '3rem', flexShrink: 0, whiteSpace: 'nowrap', alignItems: 'center', justifyContent: 'center' }}
            >
              {CONTACT_CONFIG.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}