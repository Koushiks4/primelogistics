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
  title: "Prime Logistic Services - Coming Soon | Global B2B Logistics",
  description: "Premium B2B logistics solutions coming soon. Dependable global delivery services for businesses that demand excellence.",
  keywords: ["B2B logistics", "global delivery", "business shipping", "logistics services", "international freight", "supply chain solutions"],
  authors: [{ name: "Prime Logistic Services" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://primelogisticservices.com",
    title: "Prime Logistic Services - Coming Soon | Global B2B Logistics",
    description: "Premium B2B logistics solutions coming soon. Dependable global delivery services for businesses that demand excellence.",
    siteName: "Prime Logistic Services",
    images: [
      {
        url: "/logos/logo 1@4x-100.png",
        width: 1200,
        height: 630,
        alt: "Prime Logistic Services Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prime Logistic Services - Coming Soon | Global B2B Logistics",
    description: "Premium B2B logistics solutions coming soon. Dependable global delivery services for businesses that demand excellence.",
    images: ["/logos/logo 1@4x.png"],
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
