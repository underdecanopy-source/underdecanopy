/**
 * Centralized Contact Configuration
 * Single source of truth for all contact information and social media handles
 * Used across all pages for consistency
 */

export const CONTACT_CONFIG = {
  // Primary contact information
  phone: "+2348064852108",
  phoneDisplay: "08064852108",
  email: "support@underdecanopy.ng",
  whatsapp: "+2348064852108",
  
  // Address
  address: {
    street: "TIK Centre, Opposite Medical Centre",
    area: "Along Poly Main Road, The Polytechnic",
    city: "Ibadan",
    state: "Oyo State",
    country: "Nigeria",
    full: "TIK Centre, Opposite Medical Centre, Along Poly Main Road, The Polytechnic, Ibadan, Oyo State, Nigeria"
  },

  // Business hours
  hours: {
    weekday: "9:00 AM - 6:00 PM",
    weekend: "10:00 AM - 4:00 PM",
    timezone: "WAT (West Africa Time)",
  },

  // Social media handles (consistent across all services)
  social: {
    facebook: "https://facebook.com/underdecanopy",
    twitter: "https://twitter.com/underdecanopy",
    instagram: "https://instagram.com/underdecanopy",
    linkedin: "https://linkedin.com/company/underdecanopy",
    youtube: "https://youtube.com/@underdecanopy",
    tiktok: "https://tiktok.com/@underdecanopy",
  },

  // Service-specific contact info
  services: {
    applysmart: {
      email: "info@applysmart.ng",
      phone: "+2348064852108",
      whatsapp: "+2348064852108",
    },
    coophub: {
      email: "support@coophub.ng",
      phone: "+2348064852108",
      whatsapp: "+2348064852108",
    },
    techlift: {
      email: "info@techlift.ng",
      phone: "+2348064852108",
      whatsapp: "+2348064852108",
    },
    smarttax: {
      email: "support@smarttax.ng",
      phone: "+2348064852108",
      whatsapp: "+2348064852108",
    },
    trustfix: {
      email: "support@trustfix.ng",
      phone: "+2348064852108",
      whatsapp: "+2348064852108",
    },
    swiftwheel: {
      email: "support@swiftwheel.ng",
      phone: "+2348064852108",
      whatsapp: "+2348064852108",
    },
  },

  // Helper functions for generating links
  getWhatsAppLink: (message?: string) => {
    const phone = CONTACT_CONFIG.whatsapp.replace(/\D/g, '');
    const encodedMessage = message ? `?text=${encodeURIComponent(message)}` : '';
    return `https://wa.me/${phone}${encodedMessage}`;
  },

  getPhoneLink: () => `tel:${CONTACT_CONFIG.phone}`,

  getEmailLink: (subject?: string) => {
    const encodedSubject = subject ? `?subject=${encodeURIComponent(subject)}` : '';
    return `mailto:${CONTACT_CONFIG.email}${encodedSubject}`;
  },

  getGoogleMapsLink: () => {
    const encoded = encodeURIComponent(CONTACT_CONFIG.address.full);
    return `https://maps.google.com/?q=${encoded}`;
  },

  // Quick contact messages for WhatsApp
  quickMessages: {
    inquiry: "Hello! I have an inquiry about your services.",
    support: "Hello! I need support with my account.",
    booking: "Hello! I'd like to book a service.",
    demo: "Hello! I'd like to see a demo of your service.",
    pricing: "Hello! Can you provide pricing information?",
  },
};

export type ContactConfig = typeof CONTACT_CONFIG;

