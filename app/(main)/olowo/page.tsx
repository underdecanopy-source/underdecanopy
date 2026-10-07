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
    title: 'Olowo | Business Operating System for SMEs',
    description: 'Olowo is being built as a Business Operating System for SMEs, with digital receipts and tax workflows connected to wider business operations.',
};

export default function OlowoPage() {
    return (
        <div>
            <Navigation />
            <main data-page="olowo">
                <Hero />
                <Features />

                {/* Receipt Solution Section */}
                <section className="bg-white py-20" id="receipts">
                    <div className="page-container">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-800">Digital Receipts &amp; Tax Workflows in Olowo</h2>
                            <p className="text-gray-600 mt-2 max-w-3xl mx-auto">Olowo brings business capabilities together in one platform, including professional digital receipts and tax records for Nigerian businesses.</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-6">Benefits for Your Business</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">1</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-800">Eliminate Paper Waste</h4>
                                            <p className="text-gray-600 text-sm">Preview digital receipts generated from demo transactions. Records currently stay in this browser and are not a durable cloud archive.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">2</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-800">Receipt Sharing Preview</h4>
                                            <p className="text-gray-600 text-sm">Explore the receipt-sharing workflow in the demo. Delivery depends on configuration and is not guaranteed by the preview.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">3</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-800">Automatic Tax Tracking</h4>
                                            <p className="text-gray-600 text-sm">Every receipt automatically feeds into your tax records. VAT, withholding tax, and income are tracked in real time so you are always prepared for filing.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">4</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-800">Professional Branding</h4>
                                            <p className="text-gray-600 text-sm">Every receipt carries your business name, logo, and contact details, reinforcing your brand with every customer interaction.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-8">
                                <h3 className="text-2xl font-bold text-gray-800 mb-6">Tax Filing Made Easy</h3>
                                <p className="text-gray-600 mb-6">Olowo supports Nigerian tax workflows, including preparing VAT and income tax records and organizing documents for review.</p>
                                <div className="space-y-3">
                                    <div className="bg-white p-4 rounded-lg shadow-sm">
                                        <h4 className="font-semibold text-gray-800 mb-1">VAT Returns</h4>
                                        <p className="text-gray-600 text-sm">Automatically calculate and prepare monthly VAT returns based on your sales and purchase records.</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg shadow-sm">
                                        <h4 className="font-semibold text-gray-800 mb-1">Income Tax Return Preparation</h4>
                                        <p className="text-gray-600 text-sm">Prepare tax-return documents for review. The demo does not submit returns to tax authorities.</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg shadow-sm">
                                        <h4 className="font-semibold text-gray-800 mb-1">Withholding Tax</h4>
                                        <p className="text-gray-600 text-sm">Track withholding tax deductions on payments and generate remittance schedules for submission.</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg shadow-sm">
                                        <h4 className="font-semibold text-gray-800 mb-1">TIN Registration Support</h4>
                                        <p className="text-gray-600 text-sm">Need a Tax Identification Number? Olowo guides you through the NRS registration process.</p>
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
                    subtitle="Explore Olowo’s digital receipts and tax workflows"
                    serviceOptions={[
                        { value: "Digital Receipts", label: "Digital Receipts" },
                        { value: "Tax Filing", label: "Tax Filing" },
                        { value: "VAT Returns", label: "VAT Returns" },
                        { value: "TIN Registration", label: "TIN Registration" },
                        { value: "Other", label: "Other" },
                    ]}
                />
                <MobileOptimizedFooter serviceName="Olowo" showQuickContact={false} />
            </main>
        </div>
    );
}
