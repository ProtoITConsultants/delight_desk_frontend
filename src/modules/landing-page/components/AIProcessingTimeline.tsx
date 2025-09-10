import { Brain, CheckCircle, Mail } from "lucide-react";

const AIProcessingTimeline = () => {
  return (
    <section
      id="ai-processing"
      className="relative ds-section-padding-mobile md:ds-section-padding-desktop"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
      </div>

      <div className="max-w-lg md:max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-xl rounded-full px-4 py-2 mb-6 md:mb-8 border border-white/20 glass-pulse">
            <Brain className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-white/90">
              AI Agent Processing Flow
            </span>
          </div>
          <h2 className="ds-heading-lg font-bold mb-4 md:mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent md:stripe-fade-in-up md:stripe-stagger-2">
            Delight Customers With
            <br />
            <span className="ds-gradient-primary-text">Instant Resolution</span>
          </h2>
          <p className="text-white/70 md:max-w-3xl md:mx-auto leading-relaxed md:stripe-fade-in-up md:stripe-stagger-3">
            See how the Delight Desk Agent processes and resolves customer
            requests in real-time.
          </p>
        </div>

        {/* Website Timeline - Center Line Style */}
        <div className="relative max-w-5xl mx-auto hidden md:block">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-purple-500 via-blue-500 to-green-500 opacity-30"></div>

          {/* Timeline Icons - Static positioning */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-10 h-full z-10">
            {/* Step 1 Icon */}
            <div
              className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
              style={{ top: "4rem" }}
            >
              <Mail className="w-5 h-5 text-white" />
            </div>
            {/* Step 2 Icon */}
            <div
              className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
              style={{ top: "20rem" }}
            >
              <Brain className="w-5 h-5 text-white" />
            </div>
            {/* Step 3 Icon */}
            <div
              className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center"
              style={{ top: "37rem" }}
            >
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Timeline Steps */}
          <div className="space-y-20">
            {/* Step 1: Customer Email - Left Side */}
            <div className="flex items-center stripe-scale-in stripe-stagger-4">
              <div className="w-1/2 pr-8 text-right">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 inline-block hover:border-purple-500/50 transition-all duration-300 stripe-shimmer">
                  <div className="text-sm text-purple-400 mb-2 font-medium">
                    3:47 PM • Incoming Email
                  </div>
                  <div className="font-semibold text-white mb-2">
                    From: sarah@customer.com
                  </div>
                  <div className="text-white/80">
                    &quot;Where&apos;s my order #1234?! I need it by Friday for
                    my trip!&quot;
                  </div>
                  <div className="text-xs text-red-400 mt-2">
                    😤 Frustrated Customer
                  </div>
                </div>
              </div>
              <div className="w-1/2 pl-8">
                <div className="text-xl font-bold text-white">
                  Customer reaches out
                </div>
                <div className="text-white/70">
                  Urgent shipping inquiry received
                </div>
              </div>
            </div>

            {/* Step 2: AI Processing - Right Side */}
            <div className="flex items-center stripe-scale-in stripe-stagger-5">
              <div className="w-1/2 pr-8 text-right">
                <div className="text-xl font-bold text-white">
                  AI agent analyzes in real-time
                </div>
                <div className="text-white/70">
                  Order lookup + carrier tracking + prediction
                </div>
              </div>
              <div className="w-1/2 pl-8">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 inline-block hover:border-blue-500/50 transition-all duration-300 stripe-shimmer">
                  <div className="text-sm text-blue-400 mb-3 font-medium">
                    Processing • 1.2 seconds
                  </div>
                  <div className="space-y-2 text-sm text-white/80">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Order #1234 found in WooCommerce</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>UPS tracking: Out for delivery</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>AI agent prediction: Friday 2:00 PM delivery</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Professional response generated</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Intelligent Response - Left Side */}
            <div className="flex items-center stripe-scale-in stripe-stagger-6">
              <div className="w-1/2 pr-8 text-right">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 inline-block hover:border-green-500/50 transition-all duration-300 stripe-shimmer">
                  <div className="text-sm text-green-400 mb-2 font-medium">
                    3:47 PM • Sent (0.3s later)
                  </div>
                  <div className="font-semibold text-white mb-2">Hi Sarah!</div>
                  <div className="text-white/80 mb-3">
                    Perfect timing! Your order is out for delivery and will
                    arrive{" "}
                    <strong className="text-white">Friday at 2:00 PM</strong>{" "}
                    based on current UPS tracking data.
                  </div>
                  <div className="text-xs text-green-400">
                    😊 Problem solved instantly
                  </div>
                </div>
              </div>
              <div className="w-1/2 pl-8">
                <div className="text-xl font-bold text-white">
                  Customer delighted
                </div>
                <div className="text-white/70">
                  Precise answer delivered instantly
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Timeline - Left-Aligned Design */}
        <div className="relative pl-8 block md:hidden">
          {/* Left Timeline Line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-blue-500 to-green-500 opacity-20"></div>

          <div className="space-y-16">
            {/* Step 1: Customer Email */}
            <div className="relative">
              {/* Timeline Icon */}
              <div className="absolute -left-8 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Mail className="w-4 h-4 text-white" />
              </div>

              <div className="ml-4">
                <div className="text-lg font-bold text-white mb-2">
                  Customer reaches out
                </div>
                <div className="text-white/70 text-sm mb-4">
                  Urgent shipping inquiry received
                </div>

                <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-4 stripe-shimmer">
                  <div className="text-xs text-purple-400 mb-2 font-medium">
                    3:47 PM • Incoming Email
                  </div>
                  <div className="font-semibold text-white text-sm mb-2">
                    From: sarah@customer.com
                  </div>
                  <div className="text-white/80 text-sm">
                    &quot;Where&apos;s my order #1234?! I need it by Friday for
                    my trip!&quot;
                  </div>
                  <div className="text-xs text-red-400 mt-2">
                    😤 Frustrated Customer
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: AI Processing */}
            <div className="relative">
              {/* Timeline Icon */}
              <div className="absolute -left-8 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>

              <div className="ml-4">
                <div className="text-lg font-bold text-white mb-2">
                  AI agent analyzes in real-time
                </div>
                <div className="text-white/70 text-sm mb-4">
                  Order lookup + carrier tracking + prediction
                </div>

                <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-4 stripe-shimmer">
                  <div className="text-xs text-blue-400 mb-3 font-medium">
                    Processing • 1.2 seconds
                  </div>
                  <div className="space-y-2 text-xs text-white/80">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-3 h-3 text-green-400" />
                      <span>Order #1234 found in WooCommerce</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-3 h-3 text-green-400" />
                      <span>UPS tracking: Out for delivery</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-3 h-3 text-green-400" />
                      <span>AI agent prediction: Friday 2:00 PM delivery</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-3 h-3 text-green-400" />
                      <span>Professional response generated</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Intelligent Response */}
            <div className="relative">
              {/* Timeline Icon */}
              <div className="absolute -left-8 w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>

              <div className="ml-4">
                <div className="text-lg font-bold text-white mb-2">
                  Customer delighted
                </div>
                <div className="text-white/70 text-sm mb-4">
                  Precise answer delivered instantly
                </div>

                <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-4 stripe-shimmer">
                  <div className="text-xs text-green-400 mb-2 font-medium">
                    3:47 PM • Sent (0.3s later)
                  </div>
                  <div className="font-semibold text-white text-sm mb-2">
                    Hi Sarah!
                  </div>
                  <div className="text-white/80 text-sm mb-3">
                    Perfect timing! Your order is out for delivery and will
                    arrive{" "}
                    <strong className="text-white">Friday at 2:00 PM</strong>{" "}
                    based on current UPS tracking data.
                  </div>
                  <div className="text-xs text-green-400">
                    😊 Problem solved instantly
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIProcessingTimeline;
