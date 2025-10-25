// app/page.tsx
'use client';

import Image from 'next/image';
import {
    Clock,
    MapPinHouse,
    Phone,
    Send,
} from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import Link from 'next/link';
import { coreServices, professionalServices, cafeItems } from '@/lib/data/home';
import { contactInfo } from '@/lib/data/contact';

import MicIcon from '@/components/icons/Mic';
import { ServiceCard } from '@/app/(main)/_components/ServiceCard';
import { ProfessionalServiceCard } from '@/app/(main)/_components/ProfessionalServiceCard';
import CafeItem from '@/app/(main)/_components/CafeItem';
import { ContactForm } from '@/app/components/home/ContactForm';
import { NewsletterForm } from '@/app/components/home/NewsletterForm';
import { ContactSection } from '@/components/contact/ContactSection';
import { MobileOptimizedFooter } from '@/components/contact/MobileOptimizedFooter';

export default function Page() {

  return (
    <main>
      <Navigation />


      {/* Hero — replace the existing hero section with this */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            {/* Text column */}
            <div className="text-left max-w-lg flex-shrink-0">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Welcome to Underdecanopy Digital Hub
              </h1>
              <p className="text-gray-600 mb-8">
                Your trusted center for digital solutions, business services,
                and a relaxing cafe experience in Ibadan.
              </p>
              <Link
                href="#contact"
                className="inline-block bg-orange-500 text-white py-3 px-6 rounded-full text-lg hover:bg-orange-600 transition-colors duration-300"
              >
                Get Started Today
              </Link>
            </div>

            {/* Image column: ensure it can grow but does not force text to shrink */}
            <div className="flex-1 min-w-0">
              <div className="max-w-full md:max-w-md mx-auto" style={{ contain: 'layout' }}>
                <Image
                  src="/hub.png"
                  alt="Underdecanopy Digital Hub"
                  width={1000}
                  height={1000}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  className="w-full h-auto object-cover rounded-lg shadow-lg block"
                  style={{ aspectRatio: '1 / 1' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16" id="services">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Our Core Services</h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Comprehensive digital solutions tailored to meet your business and 
              personal needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ contain: 'layout' }}>
            {coreServices.map((service) => (
              <ServiceCard
                key={service.title}
                icon={service.icon}
                title={service.title}
                description={service.description}
                link={service.link}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-16" id="additional">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Professional Services</h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Comprehensive solutions to meet your business and personal 
              needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" style={{ contain: 'layout' }}>
            {professionalServices.map((service) => (
              <ProfessionalServiceCard
                key={service.title}
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" id="cafe">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-orange-500">Cafe Experience</h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Enjoy snacks, meals, and beverages while you work or learn. Relax 
              in our cozy cafe area.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ contain: 'layout' }}>
            {cafeItems.map((item) => (
              <CafeItem
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-orange-500 text-white py-16" id="podcast">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
            <MicIcon /> Underdecanopy Podcast
          </h2>
          <p className="max-w-2xl mx-auto mb-8">
            Tune in to our episodes for digital tips and business insights 
            from Ibadan and beyond.
          </p>
          <Link href="https://underdecanopy.com/podcast" className="bg-white text-orange-500 py-3 px-6 rounded-full text-lg hover:bg-gray-100 transition-colors duration-300">
            Listen to Our Podcast
          </Link>
        </div>
      </section>

      <section className="py-16" id="contact">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Reach out for inquiries, support, or to schedule a visit 
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Get In Touch</h3>

              <div className="flex items-start gap-4 mb-6">
                <MapPinHouse size={24} className="text-orange-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800">Location</h4>
                  <p className="text-gray-600">{contactInfo.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-6">
                <Phone size={24} className="text-orange-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800">Phone</h4>
                  <p className="text-gray-600">{contactInfo.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-6">
                <Send size={24} className="text-orange-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800">Email</h4>
                  <p className="text-gray-600">{contactInfo.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-8">
                <Clock size={24} className="text-orange-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800">Working Hours</h4>
                  <p className="text-gray-600">{contactInfo.workingHours.weekdays}</p>
                  <p className="text-gray-600">{contactInfo.workingHours.saturday}</p>
                </div>
              </div>

              <div className="border-t pt-8">
                <h4 className="text-lg font-bold text-gray-800 mb-4">Newsletter</h4>
                <p className="text-gray-600 mb-4">Subscribe for updates and offers.</p>
                <NewsletterForm />
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      <ContactSection
        title="Get Started Today"
        subtitle="Contact us for your digital solutions"
      />

      <MobileOptimizedFooter serviceName="Underdecanopy" showQuickContact={true} />

    </main>
  );
}
