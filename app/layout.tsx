import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { ContactBar } from "@/components/contact/ContactBar";

export const metadata: Metadata = {
  title: "Underdecanopy Digital Hub | Business Centre & Cafe",
  description:
    "Underdecanopy Digital Hub is your trusted center for digital solutions, business services, and a relaxing cafe experience in Ibadan. We offer services like business registration, IT support, digital training, and more.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Critical CSS for CLS prevention */}
        <link rel="stylesheet" href="/critical.css" />
        {/* Font preload optimization */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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