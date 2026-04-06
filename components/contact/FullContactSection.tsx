'use client';

import { useState, FormEvent } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { CONTACT_CONFIG } from '@/lib/config/contact';
import { SocialLinks } from './SocialLinks';

interface FullContactSectionProps {
  title?: string;
  subtitle?: string;
  serviceOptions?: { value: string; label: string }[];
}

export function FullContactSection({
  title = "Contact Us",
  subtitle = "Reach out to us for more information",
  serviceOptions,
}: FullContactSectionProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch('https://formspree.io/f/xldwrqjg', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="bg-gray-100 py-16">
      <div className="page-container">
        <h2 className="text-3xl font-bold text-center mb-4">{title}</h2>
        <p className="text-center text-gray-600 mb-12">{subtitle}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 font-bold text-gray-700">Name</label>
                <input type="text" name="name" id="name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 font-bold text-gray-700">Email</label>
                <input type="email" name="email" id="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div>
                <label htmlFor="phone" className="block mb-2 font-bold text-gray-700">Phone Number</label>
                <input type="tel" name="phone" id="phone" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              {serviceOptions && (
                <div>
                  <label htmlFor="service" className="block mb-2 font-bold text-gray-700">Service Needed</label>
                  <select name="service" id="service" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    <option value="">Select a service</option>
                    {serviceOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              )}
              <div>
                <label htmlFor="message" className="block mb-2 font-bold text-gray-700">Message</label>
                <textarea name="message" id="message" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" rows={4} required></textarea>
              </div>
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold w-full transition-all duration-300 disabled:opacity-50"
              >
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
              {status === 'success' && (
                <p className="text-green-600 text-sm text-center">Message sent successfully! We will get back to you soon.</p>
              )}
              {status === 'error' && (
                <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>
              )}
            </form>
          </div>
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="text-blue-600 mt-1 w-5 h-5 flex-shrink-0" />
                  <div>
                    <p className="font-bold">Email</p>
                    <a href={`mailto:${CONTACT_CONFIG.email}`} className="text-blue-600">{CONTACT_CONFIG.email}</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="text-blue-600 mt-1 w-5 h-5 flex-shrink-0" />
                  <div>
                    <p className="font-bold">Phone</p>
                    <a href={CONTACT_CONFIG.getPhoneLink()} className="text-blue-600">{CONTACT_CONFIG.phoneDisplay}</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MessageCircle className="text-green-600 mt-1 w-5 h-5 flex-shrink-0" />
                  <div>
                    <p className="font-bold">WhatsApp</p>
                    <a href={CONTACT_CONFIG.getWhatsAppLink(CONTACT_CONFIG.quickMessages.inquiry)} target="_blank" rel="noopener noreferrer" className="text-green-600">{CONTACT_CONFIG.whatsapp}</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="text-blue-600 mt-1 w-5 h-5 flex-shrink-0" />
                  <div>
                    <p className="font-bold">Address</p>
                    <p className="whitespace-pre-line text-gray-600">
                      {CONTACT_CONFIG.address.full.split(/(Head Office:|Branch Office:)/).map((part, i) =>
                        part === 'Head Office:' || part === 'Branch Office:' ? <strong key={i}>{part}</strong> : part
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="text-blue-600 mt-1 w-5 h-5 flex-shrink-0" />
                  <div>
                    <p className="font-bold">Working Hours</p>
                    <p className="text-gray-600">Weekdays: {CONTACT_CONFIG.hours.weekday}</p>
                    <p className="text-gray-600">Weekends: {CONTACT_CONFIG.hours.weekend}</p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="font-semibold mb-3">Follow Us</h4>
                <SocialLinks variant="icons-only" size="md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
