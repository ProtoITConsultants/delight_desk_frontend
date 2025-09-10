import Navbar from "@/components/Navbar/Navbar";
import AIProcessingTimeline from "@/modules/landing-page/components/AIProcessingTimeline";
import HeroSection from "@/modules/landing-page/components/HeroSection";
import MissionControlHub from "@/modules/landing-page/components/MissionControlHub";
import SectionDivider from "@/modules/landing-page/components/SectionDivider";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      <Navbar />
      <HeroSection />
      <SectionDivider />
      <AIProcessingTimeline />
      <MissionControlHub />
    </div>
  );
}
