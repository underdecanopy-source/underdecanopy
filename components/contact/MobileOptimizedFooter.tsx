/**
 * MobileOptimizedFooter Component
 * Mobile-first footer with easy-to-tap contact buttons
 * Responsive design that works great on all devices
 */

'use client';

import { Phone, MessageCircle, Mail, MapPin } from 'lucide-react';
import { CONTACT_CONFIG } from '@/lib/config/contact';
import { SocialLinks } from './SocialLinks';
import Link from 'next/link';

interface MobileOptimizedFooterProps {
  serviceName?: string;
  showQuickContact?: boolean;
}

export function MobileOptimizedFooter({
  serviceName = 'Underdecanopy',
  showQuickContact = true,
}: MobileOptimizedFooterProps) {
  return (
    <footer className="bg-gray-900 text-gray-100 pt-8 pb-8 md:pb-8" style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom, 0px))' }}>
      <div className="page-container pb-16 md:pb-0">
        {/* Quick Contact Section - Mobile Optimized */}
        {showQuickContact && (
          <div className="mb-8 pb-6 border-b border-gray-700">
            <h3 className="text-lg font-bold mb-4 text-white">
              Quick Contact
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Call Button */}
              <a
                href={CONTACT_CONFIG.getPhoneLink()}
                className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95 flex-shrink-0 whitespace-nowrap"
                style={{ minHeight: '3rem' }}
              >
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span className="flex-shrink-0">Call Now</span>
              </a>

              {/* WhatsApp Button */}
              <a
                href={CONTACT_CONFIG.getWhatsAppLink(CONTACT_CONFIG.quickMessages.inquiry)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 active:scale-95 flex-shrink-0 whitespace-nowrap"
                style={{ minHeight: '3rem' }}
              >
                <MessageCircle className="w-5 h-5 flex-shrink-0" />
                <span className="flex-shrink-0">WhatsApp</span>
              </a>

              {/* Email Button */}
              <a
                href={CONTACT_CONFIG.getEmailLink()}
                className="flex items-center gap-3 bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 active:scale-95 flex-shrink-0 whitespace-nowrap"
                style={{ minHeight: '3rem' }}
              >
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span className="flex-shrink-0">Email</span>
              </a>

              {/* Location Button */}
              <a
                href={CONTACT_CONFIG.getGoogleMapsLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:scale-95 flex-shrink-0 whitespace-nowrap"
                style={{ minHeight: '3rem' }}
              >
                <MapPin className="w-5 h-5 flex-shrink-0" />
                <span className="flex-shrink-0">Location</span>
              </a>
            </div>
          </div>
        )}

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-6">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-white mb-2">
              {serviceName}
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              Your trusted partner for digital solutions in Nigeria.
            </p>
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-3">Follow Us</p>
              <SocialLinks variant="icons-only" size="md" />
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={CONTACT_CONFIG.getPhoneLink()}
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  {CONTACT_CONFIG.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT_CONFIG.getEmailLink()}
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 break-all"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  {CONTACT_CONFIG.email}
                </a>
              </li>
              <li className="text-gray-400 flex items-start gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-1" />
                <span className="leading-relaxed whitespace-pre-line">
                  {CONTACT_CONFIG.address.full.split(/(Head Office:|Branch Office:)/).map((part, i) =>
                    part === 'Head Office:' || part === 'Branch Office:' ? <strong key={i} className="text-gray-300">{part}</strong> : part
                  )}
                </span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-white font-semibold mb-4">Hours</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="leading-relaxed">
                <strong className="text-gray-300">Weekdays:</strong>
                <br />
                {CONTACT_CONFIG.hours.weekday}
              </li>
              <li className="leading-relaxed">
                <strong className="text-gray-300">Weekends:</strong>
                <br />
                {CONTACT_CONFIG.hours.weekend}
              </li>
              <li className="text-xs text-gray-500 mt-3">
                {CONTACT_CONFIG.hours.timezone}
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} {serviceName}. All rights reserved.
          </p>
          <p className="mt-2 text-xs">
            Made with ❤️ for Nigerian businesses
          </p>
        </div>
      </div>
    </footer>
  );
}