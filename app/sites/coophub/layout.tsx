import { SiteLayout } from '@/components/shared/SiteLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CoopHub | Cooperative Savings & School Fee Management',
  description: 'Save gradually, access loans, and manage school fees digitally with CoopHub. Powered by Wema Bank for secure cooperative savings.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteLayout>{children}</SiteLayout>;
}