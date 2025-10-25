'use client';

import { useEffect } from 'react';
import { AlertCircle, Home } from 'lucide-react';
import Link from 'next/link';

/**
 * Error Boundary Component
 * Catches and displays errors that occur in the (main) route group
 * Provides user-friendly error message and recovery options
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console for debugging
    console.error('Page error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-red-100 rounded-full">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>

        {/* Error Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Oops! Something went wrong
        </h1>

        {/* Error Description */}
        <p className="text-gray-600 mb-6">
          We encountered an unexpected error. Please try again or return to the home page.
        </p>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="mb-6 p-4 bg-gray-100 rounded text-left">
            <p className="text-xs font-mono text-gray-700 break-words">
              {error.message}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={reset}
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-300"
          >
            Try Again
          </button>

          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-300"
          >
            <Home size={20} />
            Back to Home
          </Link>
        </div>

        {/* Support Message */}
        <p className="text-xs text-gray-500 mt-6">
          If this problem persists, please contact us at{' '}
          <a
            href="mailto:underdecanopy@gmail.com"
            className="text-orange-500 hover:underline"
          >
            underdecanopy@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}

