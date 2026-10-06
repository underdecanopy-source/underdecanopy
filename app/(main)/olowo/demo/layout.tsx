import type { ReactNode } from 'react';
import { DemoShell } from './_components/DemoShell';

export const metadata = {
    title: 'Olowo Demo',
    description: 'Interactive demo of Olowo digital receipt and tax workflows for Nigerian SMEs.',
};

export default function DemoLayout({ children }: { children: ReactNode }) {
    return <DemoShell>{children}</DemoShell>;
}
