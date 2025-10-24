'use client';

import { useFormState } from 'react-dom';
import {
  subscribeToNewsletter,
  type NewsletterState,
} from '@/lib/actions/newsletter';
import { NewsletterSubmitButton } from './NewsletterSubmitButton';

export function NewsletterForm() {
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
