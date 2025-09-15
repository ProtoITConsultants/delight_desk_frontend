import { RAPID_RESOLUTION_FEATURE_TYPES } from "@/types/landing-page";
import { LANDING_PAGE_CONSTANTS } from "../constants";
import {
  AlertTriangle,
  Brain,
  Check,
  CheckCircle,
  DollarSign,
  Mail,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const RapidResolutionFeature = ({
  Icon,
  title,
  description,
  className,
}: RAPID_RESOLUTION_FEATURE_TYPES) => (
  <div className="flex items-start space-x-4 md:space-x-6">
    <div
      className={cn(
        "w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0",
        className
      )}
    >
      <Icon className="w-6 md:w-8 h-6 md:h-8 text-white" />
    </div>
    <div>
      <h3 className="text-lg md:text-2xl font-bold text-white mb-2 md:mb-3">
        {title}
      </h3>
      <p className="text-white/70 text-sm md:text-lg leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);

const RapidResolution = () => {
  return (
    <section className="relative ds-section-padding-mobile md:ds-section-padding-desktop overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 hidden md:block">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-purple-900/50 md:hidden"></div>

      <div className="relative max-w-xl md:max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-xl rounded-full px-4 py-2 mb-6 md:mb-8 border border-white/20 glass-pulse">
            <Zap className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-medium text-white/90">
              Rapid Resolution Engine
            </span>
          </div>
          <h2 className="ds-heading-lg font-bold mb-4 md:mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            When Humans Step In,
            <br />
            <span className="ds-gradient-primary-text">
              Problems Get Solved
            </span>
          </h2>
          <p className="text-white/70 md:max-w-4xl md:mx-auto md:leading-relaxed text-sm md:text-lg">
            For complex cases requiring human touch, the AI assistant provides
            context-aware suggestions while Quick Actions resolve issues
            instantly.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="flex flex-col md:grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left: Key Benefits */}
          <div className="space-y-6 md:space-y-8">
            {LANDING_PAGE_CONSTANTS.RAPID_RESOLUTION_FEATURES.map(
              (feature, index) => (
                <RapidResolutionFeature key={index} {...feature} />
              )
            )}
          </div>

          {/* Right: Interactive Demo */}
          <div className="relative">
            {/* Demo Container */}
            <div className="md:bg-white/10 md:backdrop-blur-xl md:rounded-2xl md:border border-white/20 md:p-8 md:space-y-6 md:stripe-shimmer">
              {/* Demo Header */}
              <div className="hidden md:flex items-center space-x-3 pb-4 border-b border-white/10">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">
                    Rapid Resolution Process
                  </h4>
                  <p className="text-white/60 text-sm">
                    How human + AI collaboration works
                  </p>
                </div>
              </div>

              {/* Process Steps */}
              <div className="bg-white/5 rounded-lg p-4 mb-6">
                <h5 className="text-white font-medium mb-3 text-sm">
                  The Process:
                </h5>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-5 md:w-6 h-5 md:h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      1
                    </div>
                    <span className="text-white/80">
                      Email arrives in inbox
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 md:w-6 h-5 md:h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      2
                    </div>
                    <span className="text-white/80">
                      AI classifies complexity and routes to human review
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 md:w-6 h-5 md:h-6 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      3
                    </div>
                    <span className="text-white/80">
                      Deep analysis generates contextual response
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 md:w-6 h-5 md:h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      4
                    </div>
                    <span className="text-white/80">
                      Human expert reviews and refines
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 md:w-6 h-5 md:h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      5
                    </div>
                    <span className="text-white/80">
                      Solution delivered with precision
                    </span>
                  </div>
                </div>
              </div>

              {/* Email Inbox */}
              <div className="space-y-4">
                <h5 className="text-white font-medium text-sm">Email Inbox:</h5>

                {/* Customer Email */}
                <div className="bg-red-500/20 rounded-xl p-4 border-l-4 border-red-500">
                  <div className="flex items-center space-x-2 mb-2">
                    <Mail className="w-4 h-4 text-red-400" />
                    <span className="text-white font-medium text-sm">
                      mike.torres@gmail.com
                    </span>
                  </div>
                  <p className="text-white/90 text-sm mb-2">
                    &quot;I bought this jacket for $89 but missed your 25% off
                    sale due to a family emergency. Can I get the sale price?
                    Order #DD-2847&quot;
                  </p>
                  <div className="text-xs text-red-300">
                    Sale ended 3 days ago • Customer wants price adjustment
                  </div>
                </div>

                {/* AI Suggestion */}
                <div className="bg-blue-500/20 rounded-xl p-4 border border-blue-500/30">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Brain className="w-4 h-4 text-blue-400" />
                      <span className="text-blue-300 font-medium text-sm">
                        AI Suggestion (1.2s)
                      </span>
                    </div>
                    <span className="text-green-300 text-xs">
                      High Confidence
                    </span>
                  </div>
                  <p className="text-blue-100 text-sm mb-3">
                    &quot;Hi Mike, sorry about your emergency. I&apos;m applying
                    the 25% discount to your order retroactively. Processing a
                    $22.25 refund now - you&apos;ll see it in 1-2 business
                    days!&quot;
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <div className="flex-1 bg-green-600 text-white px-3 py-2 rounded text-sm font-medium flex items-center justify-center space-x-1 min-w-fit">
                      <Check className="w-4 h-4" />
                      <span>Partial Refund $22.25</span>
                    </div>
                    <div className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm font-medium flex items-center justify-center space-x-1 min-w-fit">
                      <DollarSign className="w-4 h-4" />
                      <span>Partial Refund $22.25</span>
                    </div>
                  </div>
                </div>

                {/* Resolution */}
                <div className="bg-green-500/20 rounded-xl p-4 border-l-4 border-green-500">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-green-300 font-medium text-sm">
                      Problem Resolved
                    </span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/80">
                        ✓ Compassionate email reviewed and sent
                      </span>
                      <span className="text-green-300 text-xs">20s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">
                        ✓ Partial refund processed
                      </span>
                      <span className="text-green-300 text-xs">1.1s</span>
                    </div>
                    <div className="text-green-200 text-xs mt-2">
                      💝 Customer keeps purchase + feels valued
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stats Pill */}
            <div className="md:absolute -bottom-5 left-1/2 md:transform md:-translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full px-6 py-3 border border-purple-400/30 shadow-lg md:whitespace-nowrap w-fit mx-auto md:mx-0 mt-10 md:mt-0">
              <div className="text-sm font-medium text-white text-center">
                30 seconds vs 7 minutes manually
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RapidResolution;
