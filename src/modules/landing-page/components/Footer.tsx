import { Zap } from "lucide-react";
import Link from "next/link";

const LandingPageFooter = () => {
  return (
    <footer className="relative border-t border-white/10 ds-section-padding-desktop">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">Delight Desk</span>
          </div>
          <p className="text-white/60 max-w-2xl mx-auto">
            The most advanced customer service platform for modern e-commerce
            teams. Transform your support experience today.
          </p>
        </div>

        {/* Simplified Horizontal Menu */}
        <div className="flex flex-wrap justify-center items-center gap-8 mb-12 text-white/60">
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
          <a href="#pricing" className="hover:text-white transition-colors">
            Pricing
          </a>
          <a href="#contact" className="hover:text-white transition-colors">
            About
          </a>
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-white transition-colors">
            Terms of Service
          </Link>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
          <div className="text-white/60 mb-4 md:mb-0">
            © 2025 Delight Desk. All rights reserved.
          </div>
          <div className="flex items-center space-x-6"></div>
        </div>
      </div>
    </footer>
  );
};

export default LandingPageFooter;
