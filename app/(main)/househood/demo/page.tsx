import type { Metadata } from 'next';
import { Navigation } from '@/components/Navigation';
import { HousehoodPortalDemo } from './_components/HousehoodPortalDemo';

export const metadata: Metadata = {
  title: 'Househood Portals Demo | Underdecanopy',
  description: 'Interactive Househood Portals demo integrated into the Underdecanopy platform.',
};

export default function HousehoodDemoPage() {
  return (
    <div>
      <Navigation />
      <main id="main-content">
        <HousehoodPortalDemo />
      </main>
    </div>
  );
}
