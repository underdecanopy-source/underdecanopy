
import { ContactForm } from '@/components/shared/ContactForm';
import { OlowoDashboard } from './_components/OlowoDashboard';

export default function OlowoPage() {
  return (
    <main className="container mx-auto py-8 px-4">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Olowo</h1>
        <p className="text-gray-600">Digital receipt and tax workflows inside the Olowo Business Operating System.</p>
      </div>
      
      <div className="mb-16">
        <OlowoDashboard />
      </div>

      <div className="max-w-xl mx-auto mt-16 print:hidden">
        <h2 className="text-2xl font-bold mb-4">Contact Support</h2>
        <ContactForm />
      </div>
    </main>
  );
}
