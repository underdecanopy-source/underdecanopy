'use client';

import Image from 'next/image';
import {
  Clock,
  Cpu,
  Facebook,
  FileUser,
  HandCoins,
  Instagram,
  LifeBuoy,
  Linkedin,
  LocationEditIcon,
  MapPinHouse,
  Phone,
  QrCode,
  School,
  Send,
  ShieldHalf,
  Twitter,
  Printer,
  Video,
  Headset,
  Laptop,
  Paintbrush,
  Code,
  BookOpen,
  Map,
  Coffee,
  Cookie,
  Utensils,
  GlassWater,
  Star,
  Mic,
  MessageCircle,
  MessageSquare,
} from 'lucide-react';
import { useFormState, useFormStatus } from 'react-dom';
import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import Link from 'next/link';
import { submitContactForm, type State } from '@/lib/actions/contact';
import {
  subscribeToNewsletter,
  type NewsletterState,
} from '@/lib/actions/newsletter';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-orange-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-colors duration-300 disabled:bg-gray-400"
    >
      {pending ? 'Sending...' : 'Send Message'}
    </button>
  );
}

function ContactForm() {
  const initialState: State = { message: null, errors: {} };
  const [state, dispatch] = useFormState(submitContactForm, initialState);

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Send a Message</h3>
      <form action={dispatch}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {state.errors?.name && (
            <p className="text-red-500 text-sm mt-1">{state.errors.name[0]}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {state.errors?.email && (
            <p className="text-red-500 text-sm mt-1">{state.errors.email[0]}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="subject" className="block text-gray-700 font-semibold mb-2">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="Enter subject"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Enter your message"
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          ></textarea>
          {state.errors?.message && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.message[0]}
            </p>
          )}
        </div>

        <SubmitButton />

        {state.message && (
          <p
            className={`mt-4 text-sm ${
              state.errors ? 'text-red-500' : 'text-green-500'
            }`}
          >
            {state.message}
          </p>
        )}
      </form>
    </div>
  );
}

function NewsletterSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-orange-500 text-white px-4 rounded-r-lg hover:bg-orange-600 transition-colors duration-300 disabled:bg-gray-400"
    >
      {pending ? 'Subscribing...' : 'Subscribe'}
    </button>
  );
}

function NewsletterForm() {
  const initialState: NewsletterState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(subscribeToNewsletter, initialState);

  return (
    <form action={dispatch}>
      <div className="flex">
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          className="w-full px-4 py-2 text-gray-800 border border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <NewsletterSubmitButton />
      </div>
      {state.errors?.email && (
        <p className="text-red-500 text-sm mt-1">{state.errors.email[0]}</p>
      )}
      {state.message && !state.errors && (
        <p className="text-green-500 text-sm mt-1">{state.message}</p>
      )}
    </form>
  );
}

export default function Page() {
  return (
    <>
      <Navigation />

      <section className="bg-gray-100 py-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between flex-wrap items-center">
            <div className="text-left max-w-lg">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Underdecanopy Digital Hub</h1>
              <p className="text-gray-600 mb-8">
                Your trusted center for digital solutions, business services,
                and a relaxing cafe experience in Ibadan.
              </p>
              <a href="#contact" className="bg-orange-500 text-white py-3 px-6 rounded-full text-lg hover:bg-orange-600 transition-colors duration-300">
                Get Started Today
              </a>
            </div>
            <Image
              src="/hub.png"
              alt="Underdecanopy Digital Hub"
              className="hidden md:block w-1/2 rounded-full shadow-lg"
              width={1000}
              height={1000}
            />
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="flex items-center gap-3 text-xl font-bold text-gray-800 mb-4">
                <span className="p-3 rounded-full bg-orange-100 text-orange-500">
                  <ShieldHalf size={32} />
                </span>
                TrustFix
              </h3>
              <p className="text-gray-600 mb-6">
                Discover top-notch computer and accessories sales, expert
                repairs, upgrades, and reliable IT support all in one place.
              </p>
              <Link href="/trustfix" className="text-orange-500 font-semibold hover:underline">Let's Go</Link>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="flex items-center gap-3 text-xl font-bold text-gray-800 mb-4">
                <span className="p-3 rounded-full bg-orange-100 text-orange-500">
                  <LifeBuoy size={32} />
                </span>
                Swift Wheel
              </h3>
              <p className="text-gray-600 mb-6">
                Register your business and file annual returns with ease. We
                handle CAC processes quickly and professionally.
              </p>
              <Link href="/swiftwheel" className="text-orange-500 font-semibold hover:underline">Let's Go</Link>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="flex items-center gap-3 text-xl font-bold text-gray-800 mb-4">
                <span className="p-3 rounded-full bg-orange-100 text-orange-500">
                  <Cpu size={32} />
                </span>
                TechLift
              </h3>
              <p className="text-gray-600 mb-6">
                Advance your career with hands-on training in computers,
                programming, graphics, and digital technologies from certified
                experts.
              </p>
              <Link href="/techlift" className="text-orange-500 font-semibold hover:underline">Let's Go</Link>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="flex items-center gap-3 text-xl font-bold text-gray-800 mb-4">
                <span className="p-3 rounded-full bg-orange-100 text-orange-500">
                  <FileUser size={32} />
                </span>
                ApplySmart
              </h3>
              <p className="text-gray-600 mb-6">
                Fast, easy, and reliable Post UTME, admission applications, and
                online registration for schools and universities.
              </p>
              <Link href="/applysmart" className="text-orange-500 font-semibold hover:underline">Let's Go</Link>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="flex items-center gap-3 text-xl font-bold text-gray-800 mb-4">
                <span className="p-3 rounded-full bg-orange-100 text-orange-500">
                  <School size={32} />
                </span>
                CoopHub
              </h3>
              <p className="text-gray-600 mb-6">
                Simplify your school and cooperative financial life in one
                place. Make secure fee payments, manage savings and
                contributions, and access instant loans, all through our
                trusted digital cooperative platform for students and parents.
              </p>
              <Link href="/coophub" className="text-orange-500 font-semibold hover:underline">Let's Go</Link>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="flex items-center gap-3 text-xl font-bold text-gray-800 mb-4">
                <span className="p-3 rounded-full bg-orange-100 text-orange-500">
                  <HandCoins size={32} />
                </span>
                SmartTax Receipts
              </h3>
              <p className="text-gray-600 mb-6">
                Our digital receipt system not only makes receiving receipts
                more convenient for your customers, it takes the stress out of
                customers having to hold onto their receipts when tax time
                rolls around.
              </p>
              <Link href="/smarttax" className="text-orange-500 font-semibold hover:underline">Let's Go</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-16" id="additional">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Professional Services</h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Comprehensive solutions to meet all your business and personal
              needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-orange-500 text-white mx-auto mb-4">
                <Printer />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Printing & Photocopy</h3>
              <p className="text-gray-600">
                High-quality document printing, photocopying, and scanning
                services.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-orange-500 text-white mx-auto mb-4">
                <Video />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Church Media</h3>
              <p className="text-gray-600">
                Audio-visual support, live streaming, and media production for
                churches.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-orange-500 text-white mx-auto mb-4">
                <Headset />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">IT User Support</h3>
              <p className="text-gray-600">
                Technical assistance, troubleshooting, and user training for IT
                systems.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-orange-500 text-white mx-auto mb-4">
                <Laptop />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">School Management</h3>
              <p className="text-gray-600">
                Sales and setup of school management and e-learning software.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-orange-500 text-white mx-auto mb-4">
                <Paintbrush />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Graphics Design</h3>
              <p className="text-gray-600">
                Professional presentations, flyers, banners, and graphic design
                services.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-orange-500 text-white mx-auto mb-4">
                <Code />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Web Development</h3>
              <p className="text-gray-600">
                Custom websites, web apps, and online solutions for your
                business.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-orange-500 text-white mx-auto mb-4">
                <BookOpen />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Student Research Companion</h3>
              <p className="text-gray-600">
                Comprehensive research assistance including project topics,
                materials, and 24/7 support from experienced academic writers.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-orange-500 text-white mx-auto mb-4">
                <Map />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Space Rentals & Delivery Services</h3>
              <p className="text-gray-600">
                We connect students with verified rentals and provide local
                delivery services across Ibadan.
              </p>
            </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 text-orange-500 mx-auto mb-4">
                <Coffee />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Coffee & Tea</h3>
              <p className="text-gray-600">Freshly brewed coffee, herbal teas, and hot chocolate.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 text-orange-500 mx-auto mb-4">
                <Cookie />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Pastries & Snacks</h3>
              <p className="text-gray-600">Croissants, meat pies, doughnuts, chin-chin, and more.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 text-orange-500 mx-auto mb-4">
                <Utensils />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Meals</h3>
              <p className="text-gray-600">Rice dishes, noodles, and light meals for busy days.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 text-orange-500 mx-auto mb-4">
                <GlassWater />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Cold Drinks</h3>
              <p className="text-gray-600">Soft drinks, bottled water, and fresh juices.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 text-orange-500 mx-auto mb-4">
                <Star />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Daily Specials</h3>
              <p className="text-gray-600">Ask for our chef's special and combo offers.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 text-orange-500 mx-auto mb-4">
                <Star />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Café Experience</h3>
              <p className="text-gray-600">
                Relax, work, or connect with others in our cozy cafe while
                enjoying our menu.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-orange-500 text-white py-16" id="podcast">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
            <Mic /> Underdecanopy Podcast
          </h2>
          <p className="max-w-2xl mx-auto mb-8">
            Tune in to our episodes for digital tips and business insights
            from Ibadan and beyond.
          </p>
          <a href="https://example.com/podcast" className="bg-white text-orange-500 py-3 px-6 rounded-full text-lg hover:bg-gray-100 transition-colors duration-300">
            Listen to Our Podcast
          </a>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Get In Touch</h3>

              <div className="flex items-start gap-4 mb-6">
                <LocationEditIcon size={24} className="text-orange-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800">Location</h4>
                  <p className="text-gray-600">
                    Love Garden, Opposite Zenith Bank, North Campus, The
                    Polytechnic, Ibadan, Oyo State.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-6">
                <Phone size={24} className="text-orange-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800">Phone</h4>
                  <p className="text-gray-600">+234 806 485 2108</p>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-6">
                <Send size={24} className="text-orange-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800">Email</h4>
                  <p className="text-gray-600">underdecanopy@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock size={24} className="text-orange-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800">Working Hours</h4>
                  <p className="text-gray-600">Monday - Friday: 9AM - 6PM</p>
                  <p className="text-gray-600">Saturday: 10AM - 4PM</p>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div className="footer-col">
              <h4 className="text-lg font-bold mb-4">Underdecanopy Digital Hub</h4>
              <p className="text-gray-400">
                Your trusted center for digital solutions, business services,
                and a relaxing cafe experience in Ibadan.
              </p>
              <div className="flex gap-4 mt-4">
                <a
                  href="https://facebook.com/underdecanopy"
                  target="_blank"
                  rel="noopener"
                  aria-label="Facebook"
                  className="text-gray-400 hover:text-white"
                >
                  <Facebook />
                </a>
                <a
                  href="https://twitter.com/underdecanopy"
                  target="_blank"
                  rel="noopener"
                  aria-label="Twitter"
                  className="text-gray-400 hover:text-white"
                >
                  <Twitter />
                </a>
                <a
                  href="https://instagram.com/underdecanopy"
                  target="_blank"
                  rel="noopener"
                  aria-label="Instagram"
                  className="text-gray-400 hover:text-white"
                >
                  <Instagram />
                </a>
                <a
                  href="https://linkedin.com/company/underdecanopy"
                  target="_blank"
                  rel="noopener"
                  aria-label="LinkedIn"
                  className="text-gray-400 hover:text-white"
                >
                  <Linkedin />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#additional" className="text-gray-400 hover:text-white">Professional Services</a>
                </li>
                <li>
                  <a href="#services" className="text-gray-400 hover:text-white">Core Services</a>
                </li>
                <li>
                  <a href="#cafe" className="text-gray-400 hover:text-white">Cafe Experience</a>
                </li>
                <li>
                  <a href="#podcast" className="text-gray-400 hover:text-white">Podcast</a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-white">Contact</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Our Services</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">TrustFix</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">Swift Wheel</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">TechLift</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">ApplySmart</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">SchoolPay</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">SmartTax Receipts</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">Subscribe for updates and offers.</p>
              <NewsletterForm />
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Underdecanopy Digital Hub. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      <ChatWidget />

      <a
        href="https://wa.me/2348064852108?text=Hello%20Underdecanopy%20Digital%20Hub!%20I%20have%20an%20enquiry."
        className="fixed bottom-24 right-4 z-50 bg-green-500 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center"
        aria-label="Chat on WhatsApp"
        target="_blank"
        rel="noopener"
      >
        <MessageSquare size={32} />
      </a>
    </>
  );
}
