import { Navigation } from '@/components/Navigation';
import { lazy, Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mic } from 'lucide-react';

const MobileOptimizedFooter = lazy(() => import('@/components/contact/MobileOptimizedFooter').then(module => ({ default: module.MobileOptimizedFooter })));

export const metadata = {
  title: 'Podcast | Underdecanopy',
  description: 'Tune in to our episodes for digital tips and business insights from Ibadan and beyond.',
};

export default function PodcastPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-1 bg-gray-50 flex flex-col items-center justify-center p-8 pt-32 pb-16">
        <div className="max-w-2xl w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-orange-100 p-4 rounded-full">
              <Mic size={48} className="text-orange-500" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Underdecanopy Podcast</h1>
          <p className="text-lg text-gray-600 mb-8">
            Tune in to our episodes for digital tips and business insights from Ibadan and beyond.
          </p>
          
          <div className="bg-white p-12 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Coming Soon!</h2>
            <p className="text-gray-500 italic">
              We are currently setting up our podcast feed. New episodes will be available here soon. Check back later!
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
        </div>
      </main>

      <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse" />}>
        <MobileOptimizedFooter serviceName="Underdecanopy" showQuickContact={false} />
      </Suspense>
    </div>
  );
}