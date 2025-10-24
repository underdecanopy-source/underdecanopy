'use client';

import { useFormStatus } from 'react-dom';

export function SubmitButton() {
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
