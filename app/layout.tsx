import type { Metadata } from "next";
import "./globals.css";
import "./style.css";
import { Toaster } from "sonner";
import { ContactBar } from "@/components/contact/ContactBar";

export const metadata: Metadata = {
  title: "Underdecanopy Digital Hub | Business Centre & Cafe",
  description:
    "Underdecanopy Digital Hub is your trusted center for digital solutions, business services, and a relaxing cafe experience in Ibadan. We offer services like business registration, IT support, digital training, and more.",
  icons: {
    icon: "/favicon.png",
  },
  // ✅ ADDED: Viewport configuration for mobile responsiveness
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  // ✅ ADDED: Open Graph tags for social media sharing
  openGraph: {
    title: "Underdecanopy Digital Hub | Business Centre & Cafe",
    description: "Your trusted center for digital solutions, business services, and cafe experience in Ibadan",
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
    description: "Digital solutions and business services in Ibadan",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{  
  children: React.ReactNode;
}>) {
  // ✅ ADDED: JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Underdecanopy Digital Hub",
    description: "Digital solutions, business services, and cafe in Ibadan",
    url: "https://underdecanopy.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ibadan",
      addressRegion: "Oyo State",
      addressCountry: "NG",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="w-full overflow-x-hidden">
        <main className="w-full">
          {children}
          <Toaster />
        </main>
        <ContactBar />
      </body>
    </html>
  );
}