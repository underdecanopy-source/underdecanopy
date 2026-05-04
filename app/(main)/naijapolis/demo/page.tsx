import type { Metadata } from 'next';
import { NaijaPolisDemo } from './_components/NaijaPolisDemo';

export const metadata: Metadata = {
  title: 'NaijaPolis Demo | Underdecanopy',
  description: 'Interactive NaijaPolis campaign management demo for Nigerian political teams.',
};

export default function NaijaPolisDemoPage() {
  return <NaijaPolisDemo />;
}
