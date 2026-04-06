import { SiteLayout } from '@/components/shared/SiteLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TechLift | Digital Skills Training & IT Courses',
  description: 'Learn in-demand digital skills with TechLift. Web development, data analysis, graphics design, and more training courses in Ibadan.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteLayout>{children}</SiteLayout>;
}