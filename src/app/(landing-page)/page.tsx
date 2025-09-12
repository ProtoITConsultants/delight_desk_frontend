import LandingPageFooter from "@/modules/landing-page/components/Footer";
import LandingPageNavbar from "@/modules/landing-page/components/Navbar";
import AIProcessingTimeline from "@/modules/landing-page/sections/AIProcessingTimeline";
import ContactUs from "@/modules/landing-page/sections/ContactUs";
import CustomerSupport from "@/modules/landing-page/sections/CustomerSupport";
import FAQs from "@/modules/landing-page/sections/FAQs";
import HeroSection from "@/modules/landing-page/sections/HeroSection";
import MissionControlHub from "@/modules/landing-page/sections/MissionControlHub";
import OrderChangeAutomation from "@/modules/landing-page/sections/OrderChangeAutomation";
import RapidResolution from "@/modules/landing-page/sections/RapidResolution";
import SectionDivider from "@/modules/landing-page/sections/SectionDivider";
import SelectiveAutomation from "@/modules/landing-page/sections/SelectiveAutomation";
import SimpleSetup from "@/modules/landing-page/sections/SimpleSetup";
import Testimonials from "@/modules/landing-page/sections/Testimonials";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Navbar */}
      <LandingPageNavbar />
      {/* Content - Sections */}
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
      <ContactUs />
      {/* Footer */}
      <LandingPageFooter />
    </div>
  );
}
