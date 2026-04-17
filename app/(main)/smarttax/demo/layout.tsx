import { DemoShell } from './_components/DemoShell';

export const metadata = {
    title: 'SmartTax Demo | Underdecanopy',
    description: 'Interactive demo of the SmartTax digital receipts and tax filing app for Nigerian businesses.',
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
    return <DemoShell>{children}</DemoShell>;
}
