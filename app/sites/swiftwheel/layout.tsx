import { SiteLayout } from '@/components/shared/SiteLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Swiftwheel Services | Business Registration & CAC Services',
  description: 'Professional business name and company registration services. Get your CAC certificate, business name, and LLC registration done quickly.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteLayout>{children}</SiteLayout>;
}