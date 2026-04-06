import { SiteLayout } from '@/components/shared/SiteLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TrustFix | Reliable Tech Repair & Maintenance Services',
  description: 'Professional phone, laptop, and electronics repair services. Certified technicians with quality guaranteed repairs in Ibadan.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteLayout>{children}</SiteLayout>;
}