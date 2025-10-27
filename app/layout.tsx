import type { Metadata } from "next";
import "./globals.css";
<<<<<<< Updated upstream
import "./fonts.css";
=======
>>>>>>> Stashed changes
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
    description: "Digital solutions, business services, and cafe in Nigeria",
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
<<<<<<< Updated upstream
        {/* Font preloading for critical fonts to reduce CLS */}

        <link rel="preload" href="https://fonts.gstatic.com/s/poppins/v24/pxiEyp8kv8JHgFVrFJA.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLEj6V1s.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLCz7V1s.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="https://fonts.gstatic.com/s/roboto/v49/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWubEbWmT.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="https://fonts.gstatic.com/s/roboto/v49/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWub2bWmT.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="https://fonts.gstatic.com/s/roboto/v49/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWuYjammT.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://kit.fontawesome.com" crossOrigin="anonymous" />
        <script src="https://kit.fontawesome.com/a076d05399.js" crossOrigin="anonymous"></script>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
=======
        {/* Critical CSS for CLS prevention */}
        <link rel="stylesheet" href="/critical.css" />
        {/* Font preload optimization */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
>>>>>>> Stashed changes
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