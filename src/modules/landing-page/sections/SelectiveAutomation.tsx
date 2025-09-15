import { ArrowRight, Brain, Users } from "lucide-react";
import Link from "next/link";

const SelectiveAutomation = () => {
  return (
    <section
      id="how-it-works"
      className="relative ds-section-padding-mobile md:ds-section-padding-desktop bg-gradient-to-br from-purple-900/30 via-slate-900 to-blue-900/30"
    >
      <div className="max-w-xl md:max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-xl rounded-full px-4 py-2 mb-6 md:mb-8 border border-white/20 glass-pulse">
            <Brain className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-white/90">
              Selective Automation
            </span>
          </div>
          <h2 className="ds-heading-lg font-bold mb-4 md:mb-6 text-white md:stripe-fade-in-up md:stripe-stagger-2">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI You Can Trust
            </span>
          </h2>
          <p className="md:text-xl text-white/70 md:max-w-3xl md:mx-auto md:stripe-fade-in-up md:stripe-stagger-3">
            Smart automation that knows when to step back. The AI agent handles
            routine requests instantly while complex issues go straight to your
            team.
          </p>
        </div>

        {/* Simple AI vs Human Split */}
        <div className="flex justify-center mb-12 md:mb-16 md:stripe-scale-in md:stripe-stagger-4">
          <div className="flex flex-col md:grid lg:grid-cols-2 gap-6 md:max-w-4xl md:w-full">
            {/* AI Agent Handles */}
            <div className="bg-green-500/20 rounded-2xl border border-green-500/30 p-6 text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2">
                80%
              </div>
              <h4 className="text-xl font-bold text-white mb-3">
                AI Agent Handles
              </h4>
              <p className="text-green-200 leading-relaxed mb-4">
                Order status, refunds and returns, subscription changes.
              </p>
              <div className="bg-white/10 backdrop-blur-xl rounded-lg border border-white/20 px-4 py-2">
                <div className="text-green-300 font-medium text-sm">
                  ⚡ Instant • Accurate • Delightful
                </div>
              </div>
            </div>

            {/* Humans Handle */}
            <div className="bg-blue-500/20 rounded-2xl border border-blue-500/30 p-6 text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                20%
              </div>
              <h4 className="text-xl font-bold text-white mb-3">
                Humans Handle
              </h4>
              <p className="text-blue-200 leading-relaxed mb-4">
                VIP customers, policy exceptions, and sensitive situations.
              </p>
              <div className="bg-white/10 backdrop-blur-xl rounded-lg border border-white/20 px-4 py-2">
                <div className="text-blue-300 font-medium text-sm">
                  🧠 Thoughtful • Personal • Strategic
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section - Desktop AI Strategy */}
        <div className="text-center mt-12 md:mt-16">
          <Link
            href="/signup"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium px-8 py-3 rounded-lg md:stripe-scale-in md:stripe-stagger-7 flex items-center justify-center w-fit mx-auto"
          >
            Start Free Trial
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SelectiveAutomation;
