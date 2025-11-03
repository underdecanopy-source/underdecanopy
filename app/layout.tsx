import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./fonts.css";
import { Toaster } from "sonner";
import { ContactBar } from "@/components/contact/ContactBar";

export const metadata: Metadata = {
  metadataBase: new URL("https://underdecanopy.com"),
  title: "Underdecanopy Digital Hub | Business Centre & Cafe",
  description:
    "Underdecanopy Digital Hub is your trusted center for digital solutions, business services, and a relaxing cafe experience in Ibadan. We offer services like business registration, IT support, digital training, and more.",
  icons: {
    icon: "/favicon.png",
  },
  // ✅ ADDED: Open Graph tags for social media sharing
  openGraph: {
    title: "Underdecanopy Digital Hub | Business Centre & Cafe",
    description: "Your trusted center for digital solutions, business services, and cafe experience in Nigeria",
    url: "https://underdecanopy.com",
    siteName: "Underdecanopy Digital Hub",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Underdecanopy Digital Hub",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  // ✅ ADDED: Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Underdecanopy Digital Hub",
    description: "Digital solutions and business services in Nigeria",
    images: ["/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{  
  children: React.ReactNode;
}>) {
  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Underdecanopy Digital Hub',
    url: 'https://underdecanopy.com',
    logo: 'https://underdecanopy.com/favicon.png',
    description: 'Digital solutions, business services, and cafe experience in Nigeria',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ibadan',
      addressCountry: 'NG',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'contactus@underdecanopy.com',
    },
    sameAs: [
      // Add social media profiles when available
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {/* Font preloading for critical fonts to reduce CLS */}
        <link rel="preload" href="https://fonts.gstatic.com/s/poppins/v24/pxiEyp8kv8JHgFVrFJA.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLEj6V1s.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLCz7V1s.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="https://fonts.gstatic.com/s/roboto/v49/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWubEbWmT.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="https://fonts.gstatic.com/s/roboto/v49/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWub2bWmT.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="https://fonts.gstatic.com/s/roboto/v49/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWuYjammT.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

<script src="https://kit.fontawesome.com/a076d05399.js" crossOrigin="anonymous"></script>


      </head>
      <body className="w-full">
        <main className="w-full">
          {children}
          <Toaster />
        </main>
        <ContactBar />
      </body>
    </html>
  );
}