/**
 * ContactBar Component
 * Mobile-first sticky contact bar for easy access
 * Shows on mobile, can be hidden on desktop
 */

'use client';

import { Phone, MessageCircle, Mail } from 'lucide-react';
import { CONTACT_CONFIG } from '@/lib/config/contact';

export function ContactBar() {

  return (
    <>
      {/* Mobile Contact Bar - Sticky at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-200 shadow-lg w-full">
        <div className="flex justify-around items-center py-3 px-2 w-full">
          {/* Phone Call */}
          <a
            href={CONTACT_CONFIG.getPhoneLink()}
            className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-blue-50 transition-all duration-200 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-95 flex-shrink-0"
            aria-label="Call us"
            style={{ minWidth: 'fit-content' }}
          >
            <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <span className="text-xs font-medium text-gray-700 whitespace-nowrap">Call</span>
          </a>

          {/* WhatsApp */}
          <a
            href={CONTACT_CONFIG.getWhatsAppLink(CONTACT_CONFIG.quickMessages.inquiry)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-green-50 transition-all duration-200 flex-1 focus:outline-none focus:ring-2 focus:ring-green-500 active:scale-95 flex-shrink-0"
            aria-label="Message on WhatsApp"
            style={{ minWidth: 'fit-content' }}
          >
            <MessageCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <span className="text-xs font-medium text-gray-700 whitespace-nowrap">WhatsApp</span>
          </a>

          {/* Email */}
          <a
            href={CONTACT_CONFIG.getEmailLink()}
            className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-orange-50 transition-all duration-200 flex-1 focus:outline-none focus:ring-2 focus:ring-orange-500 active:scale-95 flex-shrink-0"
            aria-label="Send us an email"
            style={{ minWidth: 'fit-content' }}
          >
            <Mail className="w-5 h-5 text-orange-600 flex-shrink-0" />
            <span className="text-xs font-medium text-gray-700 whitespace-nowrap">Email</span>
          </a>
        </div>
      </div>

      {/* Floating WhatsApp Button - Mobile Only */}
      <a
        href={CONTACT_CONFIG.getWhatsAppLink(CONTACT_CONFIG.quickMessages.inquiry)}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-4 z-30 md:fixed md:bottom-8 md:right-8 md:z-40 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 active:scale-95 flex-shrink-0"
        aria-label="Chat with us on WhatsApp"
        title="Chat with us on WhatsApp"
        style={{ minWidth: '3.5rem', minHeight: '3.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <MessageCircle className="w-6 h-6 flex-shrink-0" />
      </a>

      {/* Desktop Contact Widget - Hidden on mobile */}
      <div className="hidden md:flex fixed bottom-8 left-8 z-40 flex-col gap-3 items-start">
        {/* WhatsApp */}
        <a
          href={CONTACT_CONFIG.getWhatsAppLink(CONTACT_CONFIG.quickMessages.inquiry)}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 active:scale-95 flex-shrink-0"
          aria-label="Chat with us on WhatsApp"
          title="Chat with us on WhatsApp"
          style={{ minWidth: '3.5rem', minHeight: '3.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <MessageCircle className="w-6 h-6 flex-shrink-0" />
        </a>

        {/* Phone */}
        <a
          href={CONTACT_CONFIG.getPhoneLink()}
          className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95 flex-shrink-0"
          aria-label="Call us"
          title="Call us"
          style={{ minWidth: '3.5rem', minHeight: '3.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Phone className="w-6 h-6 flex-shrink-0" />
        </a>
      </div>
    </>
  );
}

