import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://primelogisticservice.com"),
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  title: "Prime Logistic Services — Domestic & International Shipping",
  description: "Tech-driven logistics solutions for domestic and international shipping. Real-time tracking, express delivery, and seamless logistics across 500+ cities.",
  keywords: ["logistics", "shipping", "domestic shipping", "international shipping", "express delivery", "tracking", "freight", "courier services", "supply chain"],
  authors: [{ name: "Prime Logistic Services" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://primelogisticservices.com",
    title: "Prime Logistic Services — Domestic & International Shipping",
    description: "Tech-driven logistics solutions for domestic and international shipping. Real-time tracking, express delivery, and seamless logistics across 500+ cities.",
    siteName: "Prime Logistic Services",
    images: [
      {
        url: "/logos/logo14x-1002.png",
        width: 1200,
        height: 630,
        alt: "Prime Logistic Services Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prime Logistic Services — Domestic & International Shipping",
    description: "Tech-driven logistics solutions for domestic and international shipping. Real-time tracking, express delivery, and seamless logistics across 500+ cities.",
    images: ["/logos/logo14x-1002.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
