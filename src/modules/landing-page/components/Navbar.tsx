"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X } from "lucide-react";

const LandingPageNavbar = () => {
  // Local States
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle Scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
        isScrolled
          ? "border-b border-white/10 backdrop-blur-xl bg-slate-900/60"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Image src="./logo.svg" alt="Logo" height={32} width={161.23} />
          <div className="bg-purple-500/80 backdrop-blur-sm text-xs px-2 py-1 rounded-full border border-purple-400/30">
            <span className="text-purple-100 font-medium">Beta</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-6">
          <a
            href="#ai-processing"
            className="text-white/80 hover:text-white transition-colors"
          >
            How It Works
          </a>
          <a
            href="#about"
            className="text-white/80 hover:text-white transition-colors"
          >
            Company
          </a>
          <a
            href="#pricing"
            className="text-white/80 hover:text-white transition-colors"
          >
            Pricing
          </a>
          <a
            href="#faq"
            className="text-white/80 hover:text-white transition-colors"
          >
            FAQs
          </a>
          <a
            href="#contact"
            className="text-white/80 hover:text-white transition-colors"
          >
            Contact
          </a>
          <Link
            href="/login"
            prefetch
            className="px-4 py-2 text-white/80 hover:text-white border border-white/30 rounded-lg hover:border-white/50 transition-all duration-300"
          >
            Login
          </Link>
          <Link
            href="/signup"
            prefetch
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg"
          >
            Try Free
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden flex items-center space-x-3">
          <Link
            href="/signup"
            prefetch
            className="px-3 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 text-sm flex items-center"
          >
            Try Free
          </Link>
          <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <DropdownMenuTrigger>
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent
              sideOffset={15}
              className="w-screen px-6 py-4 space-y-4 text-white/80 hover:text-white transition-colors bg-slate-900/80 backdrop-blur-xl border border-white/10"
            >
              <DropdownMenuItem className="!bg-transparent text-white/80 hover:!text-white transition-colors py-2">
                How It Works
              </DropdownMenuItem>
              <DropdownMenuItem className="!bg-transparent text-white/80 hover:!text-white transition-colors py-2">
                Company
              </DropdownMenuItem>
              <DropdownMenuItem className="!bg-transparent text-white/80 hover:!text-white transition-colors py-2">
                Pricing
              </DropdownMenuItem>
              <DropdownMenuItem className="!bg-transparent text-white/80 hover:!text-white transition-colors py-2">
                FAQs
              </DropdownMenuItem>
              <DropdownMenuItem className="!bg-transparent text-white/80 hover:!text-white transition-colors py-2">
                Contact
              </DropdownMenuItem>
              <DropdownMenuItem className="!bg-transparent text-white/80 hover:!text-white transition-colors py-2">
                Login
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default LandingPageNavbar;
