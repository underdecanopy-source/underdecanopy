import type { Metadata } from "next";
import "./globals.css";
import "./style.css";
import { Toaster } from "sonner";
import { ContactBar } from "@/components/contact/ContactBar";
import { Navigation } from "@/components/Navigation";

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
      <body className="w-full overflow-x-hidden">
        <main className="w-full">
          <Navigation />
          {children}
          <Toaster />
        </main>
        <ContactBar />
      </body>
    </html>
  );
}