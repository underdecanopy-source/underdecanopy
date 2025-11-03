'use client';

import { useFormState } from 'react-dom';
import { submitContactForm, type State } from '@/lib/actions/contact';
import { SubmitButton } from '@/app/components/home/SubmitButton';

export function ContactForm() {
  const initialState: State = { message: null, errors: {} };
  const [state, dispatch] = useFormState(submitContactForm, initialState);

  return (
    <div className="bg-white p-8 rounded-lg shadow-md" style={{ contain: 'layout' }}>
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
          />
          <div className="min-h-[1.25rem]">
            {state.errors?.name && (
              <p className="text-red-500 text-sm mt-1">{state.errors.name[0]}</p>
            )}
          </div>
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
          />
          <div className="min-h-[1.25rem]">
            {state.errors?.email && (
              <p className="text-red-500 text-sm mt-1">{state.errors.email[0]}</p>
            )}
          </div>
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none transition-colors"
          ></textarea>
          <div className="min-h-[1.25rem]">
            {state.errors?.message && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors.message[0]}
              </p>
            )}
          </div>
        </div>

        <SubmitButton />

        <div className="min-h-[2rem] mt-4">
          {state.message && (
            <p
              className={`text-sm ${
                state.errors ? 'text-red-500' : 'text-green-500'
              }`}
            >
              {state.message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
