import { HeroProblemTransition } from "@/components/sections/HeroProblemTransition";
import { PipelineSection } from "@/components/sections/PipelineSection";
import { TwoSidedSection } from "@/components/sections/TwoSidedSection";
import { MatchingSection } from "@/components/sections/MatchingSection";
import { ProfilePreviewSection } from "@/components/sections/ProfilePreviewSection";
import { VerificationSection } from "@/components/sections/VerificationSection";
import { WhyLinksuppliedSection } from "@/components/sections/WhyLinksuppliedSection";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      {/* 01 + 02 */} <HeroProblemTransition />
      {/* 03 */} <PipelineSection />
      {/* 04 */ } <TwoSidedSection />
      {/* 05 */ } <MatchingSection />
      {/* 06 */ } <ProfilePreviewSection />
      {/* 07 + 08 */ } <VerificationSection />
      {/* 09 */ } <WhyLinksuppliedSection />
      {/* 10 */ } <CTASection />
    </>
  );
}
