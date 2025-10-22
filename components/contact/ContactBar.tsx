/**
 * ContactBar Component
 * Mobile-first sticky contact bar for easy access
 * Shows on mobile, can be hidden on desktop
 */

'use client';

import { Phone, MessageCircle, Mail } from 'lucide-react';
import { CONTACT_CONFIG } from '@/lib/config/contact';
import { useState } from 'react';

export function ContactBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Contact Bar - Sticky at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-200 shadow-lg w-screen" style={{ width: '100vw', maxWidth: '100%' }}>
        <div className="flex justify-around items-center py-3 px-2 w-full">
          {/* Phone Call */}
          <a
            href={CONTACT_CONFIG.getPhoneLink()}
            className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-blue-50 transition-colors flex-1"
            aria-label="Call us"
          >
            <Phone className="w-5 h-5 text-blue-600" />
            <span className="text-xs font-medium text-gray-700">Call</span>
          </a>

          {/* WhatsApp */}
          <a
            href={CONTACT_CONFIG.getWhatsAppLink(CONTACT_CONFIG.quickMessages.inquiry)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-green-50 transition-colors flex-1"
            aria-label="Message on WhatsApp"
          >
            <MessageCircle className="w-5 h-5 text-green-600" />
            <span className="text-xs font-medium text-gray-700">WhatsApp</span>
          </a>

          {/* Email */}
          <a
            href={CONTACT_CONFIG.getEmailLink()}
            className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-orange-50 transition-colors flex-1"
            aria-label="Send us an email"
          >
            <Mail className="w-5 h-5 text-orange-600" />
            <span className="text-xs font-medium text-gray-700">Email</span>
          </a>
        </div>
      </div>

      {/* Floating WhatsApp Button - Mobile Only */}
      <a
        href={CONTACT_CONFIG.getWhatsAppLink(CONTACT_CONFIG.quickMessages.inquiry)}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-4 z-40 md:hidden bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition-all hover:scale-110 animate-bounce"
        aria-label="Chat with us on WhatsApp"
        title="Chat with us on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* Desktop Contact Widget - Hidden on mobile */}
      <div className="hidden md:fixed md:bottom-8 md:right-8 md:z-40 md:flex md:flex-col md:gap-3">
        {/* WhatsApp */}
        <a
          href={CONTACT_CONFIG.getWhatsAppLink(CONTACT_CONFIG.quickMessages.inquiry)}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition-all hover:scale-110"
          aria-label="Chat with us on WhatsApp"
          title="Chat with us on WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </a>

        {/* Phone */}
        <a
          href={CONTACT_CONFIG.getPhoneLink()}
          className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-all hover:scale-110"
          aria-label="Call us"
          title="Call us"
        >
          <Phone className="w-6 h-6" />
        </a>
      </div>
    </>
  );
}

