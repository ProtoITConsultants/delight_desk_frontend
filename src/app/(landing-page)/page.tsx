import Navbar from "@/components/Navbar/Navbar";
import HeroSection from "@/modules/landing/components/HeroSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      <Navbar />
      <HeroSection />
    </div>
  );
}
