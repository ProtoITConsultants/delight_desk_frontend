import HeroSectionBg from "@/assets/images/HeroSectionBg";
import {
  ArrowRight,
  Brain,
  CheckCircle,
  Clock,
  DollarSign,
  Heart,
  Mail,
  Zap,
} from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="relative flex items-center justify-center pt-6 pb-0 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 px-4 md:px-6">
      {/* Stripe-Inspired Background Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <HeroSectionBg />
      </div>

      {/* Single Accent Orb */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center min-h-[600px] mt-[-49px] mb-[-49px]">
          {/* Left Column - Messaging */}
          <div className="text-center lg:text-left flex flex-col justify-center">
            {/* AI Assistant Badge - Mobile Only */}
            <div className="mt-12 mb-5 lg:hidden">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-xl rounded-full px-4 py-2 border border-white/20 glass-pulse">
                <Brain className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-white/90">
                  AI Assistant
                </span>
              </div>
            </div>

            {/* Main Content Block - Centered on Desktop */}
            <div className="lg:flex lg:flex-col lg:justify-center lg:space-y-6 space-y-5">
              {/* Focused Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent leading-tight px-2 sm:px-0 md:px-4 lg:px-0">
                Automate{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                  80% of Email Support Tickets
                </span>
              </h1>

              {/* Clear Value Proposition */}
              <p className="text-white/80 max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-xl mx-auto lg:mx-0 font-light leading-relaxed px-2 sm:px-0 md:px-4 lg:px-0">
                Delight Desk AI transforms inbox chaos into customer delight by
                instantly resolving routine support requests with human-level
                understanding.
              </p>

              {/* Primary CTA */}
              <Link
                href="/signup"
                className="ds-button-primary text-lg md:text-xl px-4 md:px-6 py-2 md:py-3 h-auto flex items-center md:gap-3 gap-2 w-fit rounded-md lg:mx-0 mx-auto"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
              </Link>

              {/* Proof Points */}
              <div className="flex flex-col sm:flex-row md:flex-col lg:flex-col xl:flex-row lg:items-start items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-6 md:space-x-0 md:space-y-3 lg:space-x-0 lg:space-y-3 xl:space-y-0 xl:space-x-6 text-white/80">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <Clock className="w-4 h-4 md:w-4 md:h-4 lg:w-5 lg:h-5 text-blue-400" />
                  </div>
                  <span className="font-medium text-sm md:text-sm lg:text-base whitespace-nowrap">
                    5 Minute Set Up
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <Zap className="w-4 h-4 md:w-4 md:h-4 lg:w-5 lg:h-5 text-yellow-400" />
                  </div>
                  <span className="font-medium text-sm md:text-sm lg:text-base whitespace-nowrap">
                    Instant Results
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                    <DollarSign className="w-4 h-4 md:w-4 md:h-4 lg:w-5 lg:h-5 text-green-400" />
                  </div>
                  <span className="font-medium text-sm md:text-sm lg:text-base whitespace-nowrap">
                    Guaranteed ROI
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Element */}
          <div className="relative hidden lg:block">
            {/* Main Visual Container */}
            <div className="relative h-96 lg:h-[500px] xl:h-[600px]">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/10 to-pink-500/20 rounded-3xl blur-3xl"></div>

              {/* Email Interface Mockup */}
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Mail className="w-3 h-3 text-blue-400" />
                    </div>
                    <span className="text-white/80 text-sm font-medium">
                      Email Inbox
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full px-3 py-1 border border-purple-500/40">
                    <Brain className="w-3 h-3 text-purple-400" />
                    <span className="text-white font-medium text-xs">
                      AI Agent
                    </span>
                  </div>
                </div>

                {/* Email Thread */}
                <div className="space-y-4 flex-1">
                  {/* Incoming Email */}
                  <div className="bg-white/5 rounded-2xl p-4 border-l-4 border-blue-400 stripe-shimmer">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center">
                        <Mail className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-white/80 text-sm font-medium">
                        sarah@example.com
                      </span>
                      <span className="text-white/40 text-xs">3 min ago</span>
                    </div>
                    <p className="text-white/80 text-sm">
                      Hi, I need to pause my subscription because I have too
                      much product.
                    </p>
                  </div>

                  {/* AI Processing Indicator */}
                  <div className="flex items-center space-x-2 py-2">
                    <div className="ai-thinking-grid">
                      <div className="ai-thinking-dot"></div>
                      <div className="ai-thinking-dot"></div>
                      <div className="ai-thinking-dot"></div>
                      <div className="ai-thinking-dot"></div>
                      <div className="ai-thinking-dot"></div>
                      <div className="ai-thinking-dot"></div>
                      <div className="ai-thinking-dot"></div>
                      <div className="ai-thinking-dot"></div>
                      <div className="ai-thinking-dot"></div>
                    </div>
                    <span className="text-purple-400 text-sm">
                      AI agent analyzing...
                    </span>
                  </div>

                  {/* AI Response */}
                  <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl p-4 border-l-4 border-green-400 stripe-shimmer">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                          <Brain className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-white/80 text-sm font-medium">
                          Delight Desk Agent
                        </span>
                      </div>
                      <span className="text-green-400 text-sm font-medium">
                        ✓ 2.3s
                      </span>
                    </div>
                    <p className="text-white/80 text-sm mb-3">
                      I&apos;ve paused your subscription and you can reactivate
                      it anytime just by replying to this email when you&apos;re
                      ready!
                    </p>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-white/80 text-sm">
                          Subscription paused successfully
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Customer Reply */}
                  <div className="bg-white/5 rounded-2xl p-4 border-l-4 border-blue-400 stripe-shimmer">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center">
                        <Mail className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-white/80 text-sm font-medium">
                        sarah@example.com
                      </span>
                      <span className="text-white/40 text-xs">Just now</span>
                    </div>
                    <p className="text-white/80 text-sm mb-3">
                      Wow, that was so fast! Thank you so much for taking care
                      of this instantly. I&apos;ll definitely be back soon to
                      reactivate! 😊
                    </p>
                    <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg p-3 border border-green-500/30">
                      <div className="flex items-center space-x-2">
                        <Heart className="w-4 h-4 text-green-400" />
                        <span className="text-white/80 text-sm font-medium">
                          Customer Delighted
                        </span>
                        <span className="text-green-400 text-sm">
                          • Instant Resolution
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
