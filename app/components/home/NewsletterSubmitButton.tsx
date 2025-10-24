'use client';

import { useFormStatus } from 'react-dom';

export function NewsletterSubmitButton() {
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
