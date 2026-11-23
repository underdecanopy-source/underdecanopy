import type { Metadata } from 'next';
import { SalesWorkspace } from '../../../_components/SalesWorkspace';

export const metadata: Metadata = {
    title: 'Sales | Olowo',
    description: 'Record tenant-scoped sales, stock movements, payments, receivables, and accounting entries.',
};

export default function SalesPage({ params }: { params: { businessId: string } }) {
    return <SalesWorkspace businessId={params.businessId} />;
}
