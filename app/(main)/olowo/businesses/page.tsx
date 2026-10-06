import type { Metadata } from 'next';
import { BusinessWorkspace } from '../_components/BusinessWorkspace';

export const metadata: Metadata = {
    title: 'Your Businesses | Olowo',
    description: 'Set up and manage your businesses in Olowo.',
};

export default function BusinessesPage() {
    return <BusinessWorkspace />;
}
