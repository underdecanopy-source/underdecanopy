import { FullContactSection } from '@/components/contact/FullContactSection';
import { MobileOptimizedFooter } from '@/components/contact/MobileOptimizedFooter';
import { Navigation } from '@/components/Navigation';
import { Hero } from './_components/Hero';
import { Features } from './_components/Features';
import { Demo } from './_components/Demo';
import { Compliance } from './_components/Compliance';
import { Pricing } from './_components/Pricing';
import { FAQ } from './_components/FAQ';

export const metadata = {
    title: 'OLÓWÒ | Business Operating System for SMEs',
    description: 'Explore the OLÓWÒ business workspace and separate browser-based receipt and tax demo. See what is available now and what remains in development.',
};

export default function OlowoPage() {
    return (
        <div>
            <Navigation />
            <main id="main-content" data-page="olowo">
                <Hero />
                <Features />

                <section className="bg-white py-20" id="receipts">
                    <div className="page-container">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-800">Receipt &amp; tax demo: what it does today</h2>
                            <p className="text-gray-600 mt-2 max-w-3xl mx-auto">This browser-based preview is separate from the signed-in business workspace. Its demo records are not connected to persisted sales.</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-6">Demo capabilities</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">1</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-800">Receipt previews</h4>
                                            <p className="text-gray-600 text-sm">Generate receipt previews from browser-local demo transactions. They are not receipts for sales recorded in a business workspace.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">2</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-800">User-mediated sharing</h4>
                                            <p className="text-gray-600 text-sm">Email may use configured SMTP or open a local email draft; WhatsApp opens a share composer. The demo cannot confirm delivery or reading.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">3</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-800">Draft tax documents</h4>
                                            <p className="text-gray-600 text-sm">Prepare draft documents for review from demo records. No return is submitted to a tax authority, and these records are not connected to persisted sales.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">4</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-800">Browser-local demo profile</h4>
                                            <p className="text-gray-600 text-sm">The demo uses profile details stored in this browser. It is not a business profile shared with or synchronized to the signed-in workspace.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-8">
                                <h3 className="text-2xl font-bold text-gray-800 mb-6">Tax demo limitations</h3>
                                <p className="text-gray-600 mb-6">The demo uses illustrative tax rules encoded in the current implementation. They are not business-configurable or versioned and are not guaranteed to reflect current regulations.</p>
                                <div className="space-y-3">
                                    <div className="bg-white p-4 rounded-lg shadow-sm">
                                        <h4 className="font-semibold text-gray-800 mb-1">Illustrative calculations</h4>
                                        <p className="text-gray-600 text-sm">Demo VAT, withholding and income-tax calculations use browser demo data only. They are not a tax determination or filing service.</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg shadow-sm">
                                        <h4 className="font-semibold text-gray-800 mb-1">Draft documents only</h4>
                                        <p className="text-gray-600 text-sm">Documents can be previewed or downloaded from the demo. Creating one does not submit a return to a tax authority.</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg shadow-sm">
                                        <h4 className="font-semibold text-gray-800 mb-1">Not connected to tax authorities</h4>
                                        <p className="text-gray-600 text-sm">Tax-authority submission, verified compliance reminders, and TIN registration integrations are not available.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Demo />
                <Compliance />
                <Pricing />
                <FAQ />
                <FullContactSection
                    title="Contact Us"
                    subtitle="Ask about the current OLÓWÒ workspace and browser-based demo"
                    serviceOptions={[
                        { value: "Business workspace", label: "Business workspace" },
                        { value: "Sales and inventory", label: "Sales and inventory" },
                        { value: "Receipt demo", label: "Receipt demo" },
                        { value: "Tax workflow demo", label: "Tax workflow demo" },
                        { value: "Other", label: "Other" },
                    ]}
                />
                <MobileOptimizedFooter serviceName="OLÓWÒ" showQuickContact={false} />
            </main>
        </div>
    );
}
