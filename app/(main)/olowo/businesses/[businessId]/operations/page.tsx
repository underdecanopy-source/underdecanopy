import type { Metadata } from 'next';
import { OperationsWorkspace } from '../../../_components/OperationsWorkspace';

export const metadata: Metadata = {
    title: 'Purchases and Expenses | Olowo',
    description: 'Manage tenant-scoped suppliers, purchases, and expenses.',
};

export default function OperationsPage({ params }: { params: { businessId: string } }) {
    return <OperationsWorkspace businessId={params.businessId} />;
}
