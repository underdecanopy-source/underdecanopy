import { SiteLayout } from '@/components/shared/SiteLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ApplySmart | University Admission Calculator & Scholarship Guide',
  description: 'Get personalized admission guidance, JAMB CAPS protocol insights, scholarship matches, and Post-UTME preparation help.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteLayout>{children}</SiteLayout>;
}