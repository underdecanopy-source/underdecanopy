'use client';

import { Navigation } from '@/components/Navigation';

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main id="main-content" className="flex-grow">{children}</main>
    </div>
  );
}
