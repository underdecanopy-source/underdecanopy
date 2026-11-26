import { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OLÓWÒ | Business Operating System for SMEs',
  description: 'OLÓWÒ is being built as a multi-tenant Business Operating System for SMEs, connecting digital receipts and tax workflows with the wider platform.',
};

export default function OlowoLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
