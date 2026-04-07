import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./fonts.css";
import { Toaster } from "sonner";
import { ContactBar } from "@/components/contact/ContactBar";

export const metadata: Metadata = {
  metadataBase: new URL("https://underdecanopy.com"),
  title: "Underdecanopy | Business Centre & Cafe",
  description:
    "Underdecanopy is your trusted center for digital solutions, business services, and a relaxing cafe experience in Ibadan. We offer services like business registration, IT support, digital training, and more.",
  icons: {
    icon: "/logo.png",
  },
  // ✅ ADDED: Open Graph tags for social media sharing
  openGraph: {
    title: "Underdecanopy | Business Centre & Cafe",
    description: "Your trusted center for digital solutions, business services, and cafe experience in Ibadan",
    url: "https://underdecanopy.com",
    siteName: "Underdecanopy",
    images: [
      {
        url: "/hub.png",
        width: 488,
        height: 512,
        alt: "Underdecanopy",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  // ✅ ADDED: Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Underdecanopy",
    description: "Digital solutions and business services in Ibadan",
    images: ["/hub.png"],
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
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect to external font services */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="w-full">
        {children}
        <Toaster />
        <ContactBar />
      </body>
    </html>
  );
}