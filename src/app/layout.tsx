import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DemoModeBanner } from "@/components/ui/DemoModeBanner";
import { GlobalModals } from "@/components/ui/GlobalModals";
import { Analytics } from "@vercel/analytics/next";

const siteUrl = "https://linksupplied-b2b.vercel.app";
const siteDescription =
  "LINKSUPPLIED is an industrial B2B discovery, intelligence, and capability-matching platform. It helps procurement teams find relevant manufacturing partners using structured requirements, verification evidence, and explainable fit criteria.";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "LINKSUPPLIED | Industrial B2B Discovery & Capability Matching",
    template: "%s | LINKSUPPLIED",
  },
  description: siteDescription,
  applicationName: "LINKSUPPLIED",
  keywords: [
    "LINKSUPPLIED",
    "industrial B2B procurement",
    "manufacturing supplier discovery",
    "manufacturing capability matching",
    "verified suppliers",
    "RFQ matching",
    "industrial sourcing",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "LINKSUPPLIED",
    title: "LINKSUPPLIED | Industrial B2B Discovery & Capability Matching",
    description: siteDescription,
  },
  twitter: {
    card: "summary",
    title: "LINKSUPPLIED | Industrial B2B Discovery & Capability Matching",
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "LINKSUPPLIED",
        url: siteUrl,
        logo: `${siteUrl}/icon.png`,
        description: siteDescription,
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "LINKSUPPLIED",
        description: siteDescription,
        publisher: { "@id": `${siteUrl}/#organization` },
        inLanguage: "en",
      },
      {
        "@type": "SoftwareApplication",
        name: "LINKSUPPLIED",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: siteUrl,
        description: siteDescription,
        publisher: { "@id": `${siteUrl}/#organization` },
      },
    ],
  };

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-sans antialiased bg-paper text-ink">
        <Suspense fallback={null}>
          <DemoModeBanner />
        </Suspense>
        <GlobalModals />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
