import type { ReactNode } from 'react';
import { DemoShell } from './_components/DemoShell';

export const metadata = {
    title: 'Olowo Receipt & Tax Preview',
    description: 'Browser-only preview of Olowo receipt and tax preparation workflows, not the complete Business OS.',
};

export default function DemoLayout({ children }: { children: ReactNode }) {
    return <DemoShell>{children}</DemoShell>;
}
