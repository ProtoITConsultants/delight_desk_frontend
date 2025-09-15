import {
  Activity,
  AlertTriangle,
  BarChart3,
  Brain,
  CheckCircle,
  DollarSign,
  HelpCircle,
  Lightbulb,
  RefreshCw,
  User,
  Zap,
} from "lucide-react";

const MissionControlHub = () => {
  return (
    <section className="relative ds-section-padding-mobile md:ds-section-padding-desktop overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-pink-900/50"></div>

      {/* Content */}
      <div className="relative max-w-xl md:max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-xl rounded-full px-4 py-2 mb-6 md:mb-8 border border-white/20 glass-pulse">
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-white/90">
              Live Dashboard
            </span>
          </div>
          <h2 className="ds-heading-lg font-bold mb-4 md:mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Mission Control Hub
          </h2>
          <p className="md:text-base text-white/70 md:max-w-3xl md:mx-auto">
            Complete visibility into your customer service automation with
            real-time AI agent processing and performance metrics all in one
            powerful dashboard.
          </p>
        </div>

        {/* Single Full-Width Dashboard Card - Desktop Only */}
        <div className="md:bg-white/10 md:backdrop-blur-xl md:rounded-2xl md:border border-white/20 md:p-8 md:glass-pulse md:mb-8">
          {/* Header with Title, Subhead, and Stats */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6 md:mb-8 bg-white/10  md:bg-transparent rounded-2xl md:rounded-none border border-white/20 md:border-0 p-6 md:p-0 dynamic-glass-pulse max-[768px]:backdrop-blur-xl">
            <div className="flex items-center space-x-3 md:space-x-4">
              <div className="w-10 md:w-12 h-10 md:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg md:rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="hidden md:block text-2xl font-bold text-white mb-1">
                  Delight Desk Mission Control
                </h3>
                <h3 className="block md:hidden text-lg font-bold text-white">
                  Mission Control
                </h3>
                <p className="text-white/60 md:text-white/70 text-sm md:text-[16px]">
                  Live customer service automation
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-2 bg-green-500/20 rounded-lg px-3 md:px-4 py-2 w-full md:w-fit">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-medium">
                127 emails processed today
              </span>
            </div>
          </div>

          {/* Top Row - 2 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4 md:mb-6">
            {/* AI Agent Processing */}
            <div className="bg-purple-500/10 backdrop-blur-xl rounded-xl border border-purple-500/30 p-4 md:p-6 dynamic-glass-pulse">
              <div className="flex items-center space-x-3 mb-3 md:mb-4">
                <div className="w-6 md:w-fit h-6 md:h-fit bg-purple-500/20 md:bg-transparent rounded-lg md:rounded-none flex md:block items-center justify-center">
                  <Brain className="w-4 md:w-5 h-4 md:h-5 text-purple-400" />
                </div>
                <h4 className="hidden md:block font-bold text-white">
                  AI Agent Processing
                </h4>
                <h4 className="block md:hidden font-bold text-white">
                  AI Processing
                </h4>
              </div>
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center justify-between">
                  <span className="hidden md:block text-white/70 text-sm">
                    Processing Queue
                  </span>
                  <span className="block md:hidden text-white/80 text-sm">
                    Queue
                  </span>
                  <span className="text-purple-200 text-sm">3 emails</span>
                </div>
                <div className="flex items-center space-x-1.5 md:space-x-2">
                  <div className="hidden md:block w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <div className="ai-thinking-grid-small md:!hidden">
                    <div className="ai-thinking-dot-small"></div>
                    <div className="ai-thinking-dot-small"></div>
                    <div className="ai-thinking-dot-small"></div>
                    <div className="ai-thinking-dot-small"></div>
                    <div className="ai-thinking-dot-small"></div>
                    <div className="ai-thinking-dot-small"></div>
                    <div className="ai-thinking-dot-small"></div>
                    <div className="ai-thinking-dot-small"></div>
                    <div className="ai-thinking-dot-small"></div>
                  </div>
                  <span className="text-purple-200 text-sm">
                    Analyzing email intent...
                  </span>
                </div>
                <div className="bg-purple-500/20 rounded-lg p-2 md:p-3">
                  <div className="text-purple-200 text-xs md:mb-1">
                    <span className="hidden md:inline">Current: </span>Order
                    Status Request
                  </div>
                  <div className="text-purple-200 md:text-purple-300 text-xs">
                    Confidence: 98.7% • ETA: 0.8s
                  </div>
                </div>
              </div>
            </div>

            {/* Today's Stats */}
            <div className="bg-green-500/10 backdrop-blur-xl rounded-xl border border-green-500/30 p-4 md:p-6 dynamic-glass-pulse">
              <div className="flex items-center space-x-3 mb-3 md:mb-4">
                <div className="w-6 md:w-fit h-6 md:h-fit bg-green-500/20 md:bg-transparent rounded-lg md:rounded-none flex md:block items-center justify-center">
                  <BarChart3 className="w-4 md:w-5 h-4 md:h-5 text-green-400" />
                </div>
                <h4 className="font-bold text-white">Today&apos;s Stats</h4>
              </div>
              <div className="space-y-2.5 md:space-y-3">
                <div className="space-y-1 md:space-y-3">
                  <div className="flex md:items-center justify-between">
                    <span className="text-white/80 md:text-white/70 text-sm">
                      Auto-resolved
                    </span>
                    <span className="text-green-200 md:text-green-400 font-medium md:font-semibold text-sm">
                      83%
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-400 to-green-500 md:bg-green-400 h-2 rounded-full"
                      style={{ width: "83%" }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-1 md:space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 md:text-white/70 text-sm">
                      Human resolved
                    </span>
                    <span className="text-purple-200 md:text-purple-400 font-medium md:font-semibold text-sm">
                      17%
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-400 to-purple-500 md:bg-purple-400 h-2 rounded-full"
                      style={{ width: "17%" }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-1 md:space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 md:text-white/70 text-sm">
                      Avg Response
                    </span>
                    <span className=" text-blue-200 md:text-blue-400 font-medium md:font-semibold text-sm">
                      2.1s
                    </span>
                  </div>
                  {/* <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-400 to-blue-500 md:bg-blue-400 h-2 rounded-full"
                      style={{ width: "88%" }}
                    ></div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row - 2 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* AI Assistant Queue */}
            <div className="bg-orange-500/10 backdrop-blur-xl rounded-xl border border-orange-500/30 p-4 md:p-6 dynamic-glass-pulse">
              <div className="flex items-center md:justify-between space-x-2 md:space-x-0 mb-3 md:mb-4">
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="w-6 md:w-fit h-6 md:h-fit bg-orange-500/20 md:bg-transparent rounded-lg md:rounded-none flex md:block items-center justify-center">
                    <AlertTriangle className="w-4 md:w-5 h-4 md:h-5 text-orange-400" />
                  </div>
                  <h4 className="font-bold text-white">Rapid Resolution</h4>
                </div>
                <span className="text-orange-300/80 md:text-orange-300 text-xs md:text-sm">
                  (AI + Human expertise)
                </span>
              </div>
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-orange-500/20 rounded-lg border-l-2 md:border-l-4 border-orange-500">
                  <User className="w-4 h-4 text-orange-400 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-white text-sm">
                      <strong>Complex refund</strong> requires human review
                    </div>
                    <div className="text-orange-200 text-xs">
                      Multiple orders • Customer: alex@business.com
                    </div>
                  </div>
                  <div className="text-white/50 text-xs">3m</div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-red-500/20 rounded-lg border-l-2 md:border-l-4 border-red-500">
                  <HelpCircle className="w-4 h-4 text-red-400 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-white text-sm">
                      <strong>Billing dispute</strong> needs agent attention
                    </div>
                    <div className="text-red-200 text-xs">
                      Chargeback claim • Order #12659
                    </div>
                  </div>
                  <div className="text-white/50 text-xs">7m</div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-yellow-500/20 rounded-lg border-l-2 md:border-l-4 border-yellow-500">
                  <Lightbulb className="w-4 h-4 text-yellow-400 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-white text-sm">
                      <strong>Custom inquiry</strong> beyond AI scope
                    </div>
                    <div className="text-yellow-200 text-xs">
                      Special request • Priority customer
                    </div>
                  </div>
                  <div className="text-white/50 text-xs">12m</div>
                </div>
              </div>
            </div>

            {/* Live Activity Stream */}
            <div className="bg-slate-500/10 backdrop-blur-xl rounded-xl border border-slate-500/30 p-4 md:p-6 dynamic-glass-pulse">
              <div className="flex items-center space-x-3 mb-3 md:mb-4">
                <div className="w-6 md:w-fit h-6 md:h-fit bg-slate-500/20 md:bg-transparent rounded-lg md:rounded-none flex md:block items-center justify-center">
                  <Activity className="w-5 h-5 text-slate-400" />
                </div>
                <h4 className="font-bold text-white">
                  Live Activity <span className="hidden md:block">Stream</span>
                </h4>
              </div>
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-green-500/20 rounded-lg border-l-4 border-green-500">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-white text-sm hidden md:block">
                      <strong>AI resolved</strong> order status inquiry from
                      sarah@example.com
                    </h4>
                    <h4 className="text-white text-sm block md:hidden">
                      <strong>AI resolved</strong> order inquiry
                    </h4>
                    <div className="text-green-200 text-xs hidden md:block">
                      Order #12847 • Response time: 1.2s • Rating: ⭐⭐⭐⭐⭐
                    </div>{" "}
                    <div className="text-green-200 text-xs block md:hidden">
                      Order #12847 • 1.2s • Rating: ⭐⭐⭐⭐⭐
                    </div>
                  </div>
                  <div className="text-white/50 text-xs flex gap-0 md:gap-0.5">
                    2<span className="hidden md:block"> min ago</span>
                    <span className="block md:hidden">m</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-blue-500/20 rounded-lg border-l-4 border-blue-500">
                  <DollarSign className="w-4 h-4 text-blue-400 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-white text-sm hidden md:block">
                      <strong>Manual refund</strong> processed for promo code
                      issue
                    </h4>
                    <h4 className="text-white text-sm block md:hidden">
                      <strong>Manual refund</strong> processed
                    </h4>
                    <div className="text-blue-200 text-xs">
                      $29.99 • Order #12843
                    </div>
                  </div>
                  <div className="text-white/50 text-xs flex gap-0 md:gap-0.5">
                    5<span className="hidden md:block">min ago</span>
                    <span className="block md:hidden">m</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-purple-500/20 rounded-lg border-l-4 border-purple-500">
                  <RefreshCw className="w-4 h-4 text-purple-400 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-white text-sm hidden md:block">
                      <strong>AI paused</strong> subscription for customer
                      request
                    </div>
                    <div className="text-white text-sm block md:hidden">
                      <strong>AI paused</strong> subscription
                    </div>
                    <div className="text-purple-200 text-xs">
                      Monthly plan • Customer: mike@store.com
                    </div>
                  </div>
                  <div className="text-white/50 text-xs flex gap-0 md:gap-0.5">
                    8<span className="hidden md:block"> min ago</span>
                    <span className="block md:hidden">m</span>
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

export default MissionControlHub;
