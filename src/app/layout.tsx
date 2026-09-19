import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DemoModeBanner } from "@/components/ui/DemoModeBanner";
import { GlobalModals } from "@/components/ui/GlobalModals";
import { Analytics } from "@vercel/analytics/next";

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
  title: "LINKSUPPLIED - Business Discovery, Intelligence & Matching",
  description:
    "Don't search through thousands of businesses. Find the ones that actually fit. LINKSUPPLIED matches your business needs with relevant partners, suppliers, and buyers - with the reasons why.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
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
