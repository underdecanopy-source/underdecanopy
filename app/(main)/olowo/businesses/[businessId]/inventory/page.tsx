import type { Metadata } from 'next';
import { InventoryWorkspace } from '../../../_components/InventoryWorkspace';

export const metadata: Metadata = {
    title: 'Inventory | Olowo',
    description: 'Manage products, warehouses, and stock movement records for your business.',
};

export default function InventoryPage({ params }: { params: { businessId: string } }) {
    return <InventoryWorkspace businessId={params.businessId} />;
}
