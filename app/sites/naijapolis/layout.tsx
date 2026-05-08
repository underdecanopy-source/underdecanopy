import { SiteLayout } from '@/components/shared/SiteLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NaijaPolis | Political Campaign Management Platform',
  description:
    'NaijaPolis is a modular campaign operations platform for Nigerian political teams, covering canvassing, events, analytics, finance, and advocacy.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteLayout>{children}</SiteLayout>;
}
