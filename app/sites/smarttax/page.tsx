
import { ContactForm } from '@/components/shared/ContactForm';
import { SmartTaxDashboard } from './_components/SmartTaxDashboard';

export default function SmartTaxPage() {
  return (
    <main className="container mx-auto py-8 px-4">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">SmartTax Dashboard</h1>
        <p className="text-gray-600">Your trusted partner for tax solutions and financial tracking.</p>
      </div>
      
      <div className="mb-16">
        <SmartTaxDashboard />
      </div>

      <div className="max-w-xl mx-auto mt-16 print:hidden">
        <h2 className="text-2xl font-bold mb-4">Contact Support</h2>
        <ContactForm />
      </div>
    </main>
  );
}

