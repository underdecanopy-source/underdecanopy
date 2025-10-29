import { ContactSection } from '@/components/contact/ContactSection';
import { MobileOptimizedFooter } from '@/components/contact/MobileOptimizedFooter';
import { Header } from './_components/Header';
import { Hero } from './_components/Hero';
import { Features } from './_components/Features';
import { Demo } from './_components/Demo';
import { Compliance } from './_components/Compliance';
import { Pricing } from './_components/Pricing';
import { FAQ } from './_components/FAQ';

export default function SmartTaxPage() {
    return (
        <>
            <Header />
            <main data-page="smarttax">
                <Hero id="hero" />
                <Features />
                <Demo />
                <Compliance />
                <Pricing />
                <FAQ />
                <ContactSection
                    title="Simplify Your Tax Management"
                    subtitle="Get started with SmartTax today"
                />
                <MobileOptimizedFooter serviceName="SmartTax" showQuickContact={false} />
            </main>
        </>
    );
}
