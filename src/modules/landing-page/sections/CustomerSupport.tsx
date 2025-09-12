import { Clock, Sparkles, Zap } from "lucide-react";

const CustomerSupport = () => {
  return (
    <section className="relative ds-section-padding-desktop bg-gradient-to-br from-purple-900/30 via-slate-900 to-indigo-900/30">
      <div className="ds-container">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-xl rounded-full px-4 py-2 mb-8 border border-white/20 glass-pulse">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-white/90">
              Customer Support 2.0
            </span>
          </div>
          <h2 className="ds-heading-lg font-bold mb-6 text-white stripe-fade-in-up stripe-stagger-2">
            2.1 Seconds vs 4 Days
          </h2>
          <p className="text-white/70 max-w-3xl mx-auto leading-relaxed stripe-fade-in-up stripe-stagger-3">
            See the dramatic difference in customer experience
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto">
          {/* Before */}
          <div className="bg-red-500/10 rounded-2xl border border-red-500/20 p-8 lg:flex-1 stripe-fade-in-up stripe-stagger-4">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-red-400" />
              </div>
              <h4 className="text-xl font-bold text-white">
                Traditional Support
              </h4>
            </div>
            <ul className="space-y-3 text-white/80 mb-6">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="leading-snug">
                  Customer waits 24-48 hours for response
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="leading-snug">
                  Agent manually searches through systems
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="leading-snug">
                  Multiple back-and-forth emails needed
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="leading-snug">
                  Frustrated customers, stressed team
                </span>
              </li>
            </ul>
            <div className="text-red-300 font-semibold text-lg">
              Resolution Time: 1-4 days
            </div>
          </div>

          {/* After */}
          <div className="bg-green-500/10 rounded-2xl border border-green-500/20 p-8 lg:flex-1 stripe-fade-in-up stripe-stagger-5">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-green-400" />
              </div>
              <h4 className="text-xl font-bold text-white">Delight Desk AI</h4>
            </div>
            <ul className="space-y-3 text-white/80 mb-6">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="leading-snug">
                  Instant AI response in 2.1 seconds
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="leading-snug">
                  AI automatically finds order & tracking
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="leading-snug">
                  Complete answer in first response
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="leading-snug">
                  Delighted customers, relaxed team
                </span>
              </li>
            </ul>
            <div className="text-green-300 font-semibold text-lg">
              Resolution Time: 2.1 seconds
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerSupport;
