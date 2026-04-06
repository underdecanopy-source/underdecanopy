
import { ContactForm } from '@/components/shared/ContactForm';

export default function SmartTaxPage() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to SmartTax</h1>
      <p className="mb-8">Your trusted partner for tax solutions.</p>
      <div className="max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <ContactForm />
      </div>
    </main>
  );
}
