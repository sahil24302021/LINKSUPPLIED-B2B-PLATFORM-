import type { Metadata } from "next";
import { EarlyAccessExperience } from "@/features/waitlist/EarlyAccessExperience";

export const metadata: Metadata = {
  title: "Join Early Access | LINKSUPPLIED",
  description: "Join LINKSUPPLIED Early Access. Tell us a little about your business in about a minute.",
  openGraph: {
    title: "Join Early Access | LINKSUPPLIED",
    description: "Tell us a little about your business. It takes about a minute.",
  },
};

export default function EarlyAccessPage() {
  return (
    <div className="min-h-[100dvh] bg-paper px-4 py-8 sm:px-6 sm:py-12 md:py-20 lg:px-8">
      <div className="mx-auto w-full max-w-2xl space-y-6 sm:space-y-8">
        <EarlyAccessExperience />
      </div>
    </div>
  );
}
