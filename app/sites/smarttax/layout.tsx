import { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SmartTax | Digital Receipts & Tax Filing Solutions',
  description: 'Generate professional digital receipts and manage tax filing for Nigerian SMEs. VAT returns, income tax, withholding tax, and TIN registration.',
};

export default function SmartTaxLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
