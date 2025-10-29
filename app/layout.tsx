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
  return (
    <html lang="en" className="scroll-smooth">
      <head>
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

        <style>
          {`/* Critical CSS for preventing layout shifts (CLS) */

/* Base reset to prevent layout shifts */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Ensure images and videos don't cause layout shifts */
img, video {
  display: block;
  max-width: 100%;
  height: auto;
}

/* Reserve space for images with width/height attributes */
img[width][height] {
  aspect-ratio: attr(width) / attr(height);
}

/* Prevent layout shift during font loading */
body {
  font-display: swap;
}

/* Main app container should take full viewport height */
#app, main {
  min-height: 100vh;
}

/* Skeleton loading utilities to reserve space during loading */
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s ease-in-out infinite;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Prevent layout shift for lazy-loaded images */
img[loading="lazy"] {
  min-height: 200px;
}

/* Ensure proper containment to prevent layout shifts */
.container {
  contain: layout style paint;
}

/* Prevent cumulative layout shift from content injection */
[data-loading] {
  min-height: 100px;
}`}
        </style>
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