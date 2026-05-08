import { SiteLayout } from '@/components/shared/SiteLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Househood Portals | Community Operations Platform',
  description:
    "Househood Portals helps residents, managers, and operations teams coordinate requests, documents, and community workflows from one platform.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteLayout>{children}</SiteLayout>;
}
