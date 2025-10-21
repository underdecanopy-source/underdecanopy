/**
 * ContactSection Component
 * Comprehensive contact section for service pages
 * Mobile-optimized with easy-to-tap buttons
 */

'use client';

import { Phone, MessageCircle, Mail, MapPin, Clock } from 'lucide-react';
import { CONTACT_CONFIG } from '@/lib/config/contact';

interface ContactSectionProps {
  title?: string;
  subtitle?: string;
  showMap?: boolean;
  showHours?: boolean;
}

export function ContactSection({
  title = "Get in Touch",
  subtitle = "We're here to help. Reach out to us today!",
  showMap = true,
  showHours = true,
}: ContactSectionProps) {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Phone */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Call Us</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Speak directly with our team
            </p>
            <a
              href={CONTACT_CONFIG.getPhoneLink()}
              className="inline-block w-full text-center bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              {CONTACT_CONFIG.phoneDisplay}
            </a>
          </div>

          {/* WhatsApp */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
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
              className="inline-block w-full text-center bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Message Us
            </a>
          </div>

          {/* Email */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Mail className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Email</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Send us a detailed message
            </p>
            <a
              href={CONTACT_CONFIG.getEmailLink()}
              className="inline-block w-full text-center bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
            >
              {CONTACT_CONFIG.email}
            </a>
          </div>
        </div>

        {/* Additional Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Address */}
          {showMap && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Visit Us
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {CONTACT_CONFIG.address.full}
                  </p>
                  <a
                    href={CONTACT_CONFIG.getGoogleMapsLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    View on Google Maps →
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Business Hours */}
          {showHours && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start gap-3">
                <Clock className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Business Hours
                  </h3>
                  <p className="text-gray-600 mb-1">
                    <strong>Weekdays:</strong> {CONTACT_CONFIG.hours.weekday}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <strong>Weekends:</strong> {CONTACT_CONFIG.hours.weekend}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    {CONTACT_CONFIG.hours.timezone}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Don't see what you're looking for? We're just a message away!
          </p>
          <a
            href={CONTACT_CONFIG.getWhatsAppLink(CONTACT_CONFIG.quickMessages.inquiry)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
          >
            Start a Conversation on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

