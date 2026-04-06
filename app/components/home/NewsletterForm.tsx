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
          aria-label="Email for newsletter"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
        />
        <NewsletterSubmitButton />
      </div>
      <div className="min-h-[1.25rem] mt-1">
        {state.errors?.email && (
          <p className="text-red-500 text-sm">{state.errors.email[0]}</p>
        )}
        {state.message && !state.errors && (
          <p className="text-green-500 text-sm">{state.message}</p>
        )}
      </div>
    </form>
  );
}
