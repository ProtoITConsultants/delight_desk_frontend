import Navbar from "@/components/Navbar/Navbar";
import AIProcessingTimeline from "@/modules/landing-page/components/AIProcessingTimeline";
import CustomerSupport from "@/modules/landing-page/components/CustomerSupport";
import FAQs from "@/modules/landing-page/components/FAQs";
import HeroSection from "@/modules/landing-page/components/HeroSection";
import MissionControlHub from "@/modules/landing-page/components/MissionControlHub";
import OrderChangeAutomation from "@/modules/landing-page/components/OrderChangeAutomation";
import RapidResolution from "@/modules/landing-page/components/RapidResolution";
import SectionDivider from "@/modules/landing-page/components/SectionDivider";
import SelectiveAutomation from "@/modules/landing-page/components/SelectiveAutomation";
import SimpleSetup from "@/modules/landing-page/components/SimpleSetup";
import Testimonials from "@/modules/landing-page/components/Testimonials";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      <Navbar />
      <HeroSection />
      <SectionDivider />
      <AIProcessingTimeline />
      <MissionControlHub />
      <OrderChangeAutomation />
      <RapidResolution />
      <SelectiveAutomation />
      <SimpleSetup />
      <CustomerSupport />
      <Testimonials />
      <FAQs />
    </div>
  );
}
