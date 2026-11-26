import type { Metadata } from 'next';
import { BusinessWorkspace } from '../_components/BusinessWorkspace';

export const metadata: Metadata = {
    title: 'Your Businesses | OLÓWÒ',
    description: 'Set up and manage your businesses in OLÓWÒ.',
};

export default function BusinessesPage() {
    return <BusinessWorkspace />;
}
