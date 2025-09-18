import { Brain, Link2, Mail, Settings, Store, Zap } from "lucide-react";

const SimpleSetup = () => {
  return (
    <section className="relative ds-section-padding-mobile bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-32 h-32 sm:w-40 sm:h-40 bg-purple-500/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-48 h-48 sm:w-60 sm:h-60 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="ds-container relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-xl rounded-full px-4 py-2 mb-8 border border-white/20 glass-pulse">
            <Settings className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-white/90">
              Simple Setup
            </span>
          </div>
          <h2 className="ds-heading-lg font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent stripe-fade-in-up stripe-stagger-2">
            Get Started in{" "}
            <span className="ds-gradient-primary-text">Minutes</span>, Not
            Months
          </h2>
          <p className="ds-body-lg ds-text-muted max-w-3xl mx-auto stripe-fade-in-up stripe-stagger-3">
            Three simple steps to transform your customer service workflow. No
            training, no complexity.
          </p>
        </div>

        {/* Mobile Version - Cards Only */}
        <div className="block lg:hidden space-y-8">
          {/* Step 1 Card - Mobile */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-20"></div>
            <div className="relative ds-surface-elevated rounded-2xl ds-card-padding shadow-2xl hover:border-purple-500/50 transition-all duration-300 stripe-shimmer">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="text-xl sm:text-2xl font-bold text-white">
                    1
                  </span>
                </div>
                <div>
                  <h3 className="ds-heading-md ds-text-primary mb-2">
                    Connect Store & Email
                  </h3>
                  <p className="ds-body-md ds-text-secondary">
                    One-click OAuth for WooCommerce/Shopify + Gmail/Outlook
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="ds-surface-card rounded-xl p-4 border border-blue-500/20">
                  <div className="flex items-center space-x-2 mb-3">
                    <Store className="h-5 w-5 text-blue-400" />
                    <span className="ds-text-primary font-semibold ds-body-md">
                      E-commerce
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="ds-body-sm ds-text-secondary">
                        WooCommerce
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="ds-body-sm ds-text-secondary">
                        Shopify
                      </span>
                    </div>
                  </div>
                </div>

                <div className="ds-surface-card rounded-xl p-4 border border-purple-500/20">
                  <div className="flex items-center space-x-2 mb-3">
                    <Mail className="h-5 w-5 text-purple-400" />
                    <span className="ds-text-primary font-semibold ds-body-md">
                      Email
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="ds-body-sm ds-text-secondary">
                        Gmail
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="ds-body-sm ds-text-secondary">
                        Outlook 365
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 Card - Mobile */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl blur opacity-20"></div>
            <div className="relative ds-surface-elevated rounded-2xl ds-card-padding shadow-2xl hover:border-green-500/50 transition-all duration-300 stripe-shimmer">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="text-xl sm:text-2xl font-bold text-white">
                    2
                  </span>
                </div>
                <div>
                  <h3 className="ds-heading-md ds-text-primary mb-2">
                    Enable Automations
                  </h3>
                  <p className="ds-body-md ds-text-secondary">
                    Toggle AI rules for instant customer responses
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between ds-surface-card rounded-lg p-3 border border-green-500/20">
                  <span className="ds-body-md ds-text-primary font-medium">
                    Order Status Requests
                  </span>
                  <div className="w-10 h-5 sm:w-12 sm:h-6 bg-green-500 rounded-full flex items-center flex-shrink-0">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full ml-0.5 sm:ml-1 shadow transform translate-x-5 sm:translate-x-6"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between ds-surface-card rounded-lg p-3 border border-blue-500/20">
                  <span className="ds-body-md ds-text-primary font-medium">
                    Refunds (Rules Based)
                  </span>
                  <div className="w-10 h-5 sm:w-12 sm:h-6 bg-green-500 rounded-full flex items-center flex-shrink-0">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full ml-0.5 sm:ml-1 shadow transform translate-x-5 sm:translate-x-6"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between ds-surface-card rounded-lg p-3 border border-purple-500/20">
                  <span className="ds-body-md ds-text-primary font-medium">
                    Subscription Changes
                  </span>
                  <div className="w-10 h-5 sm:w-12 sm:h-6 bg-green-500 rounded-full flex items-center flex-shrink-0">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full ml-0.5 sm:ml-1 shadow transform translate-x-5 sm:translate-x-6"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between ds-surface-card rounded-lg p-3 border border-pink-500/20">
                  <span className="ds-body-md ds-text-primary font-medium">
                    Product Questions
                  </span>
                  <div className="w-10 h-5 sm:w-12 sm:h-6 bg-green-500 rounded-full flex items-center flex-shrink-0">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full ml-0.5 sm:ml-1 shadow transform translate-x-5 sm:translate-x-6"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between ds-surface-card rounded-lg p-3 border border-orange-500/20">
                  <span className="ds-body-md ds-text-primary font-medium">
                    Order Cancellations
                  </span>
                  <div className="w-10 h-5 sm:w-12 sm:h-6 bg-green-500 rounded-full flex items-center flex-shrink-0">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full ml-0.5 sm:ml-1 shadow transform translate-x-5 sm:translate-x-6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 Card - Mobile */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-20"></div>
            <div className="relative ds-surface-elevated rounded-2xl ds-card-padding shadow-2xl hover:border-pink-500/50 transition-all duration-300 stripe-shimmer">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="text-xl sm:text-2xl font-bold text-white">
                    3
                  </span>
                </div>
                <div>
                  <h3 className="ds-heading-md ds-text-primary mb-2">
                    Train Your AI
                  </h3>
                  <p className="ds-body-md ds-text-secondary">
                    Drop URLs from your website to train on products and
                    policies
                  </p>
                </div>
              </div>

              <div className="ds-surface-card rounded-xl p-4 border border-purple-500/20">
                <div className="space-y-3">
                  <input
                    placeholder="Drop URL: yourstore.com/faq"
                    className="w-full ds-surface-subtle border border-purple-500/30 rounded-lg px-3 py-2 ds-text-primary placeholder-white/50 ds-body-sm focus:border-purple-400/50 focus:outline-none transition-colors"
                    disabled
                  />
                  <div className="flex items-center justify-between text-xs">
                    <span className="ds-text-secondary">✓ Product pages</span>
                    <span className="ds-text-secondary">✓ Return policy</span>
                    <span className="ds-text-secondary">✓ Brand info</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Version - Full Layout with Icons and Blurbs */}
        <div className="hidden lg:block">
          <div className="space-y-20">
            {/* Step 1: Connect Store & Email */}
            <div className="flex flex-col lg:flex-row items-center gap-12 stripe-scale-in stripe-stagger-4">
              <div className="flex-1 lg:order-1">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-20"></div>
                  <div className="relative ds-surface-elevated rounded-2xl ds-card-padding shadow-2xl hover:border-purple-500/50 transition-all duration-300 stripe-shimmer">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <span className="text-xl sm:text-2xl font-bold text-white">
                          1
                        </span>
                      </div>
                      <div>
                        <h3 className="ds-heading-md ds-text-primary mb-2">
                          Connect Store & Email
                        </h3>
                        <p className="ds-body-md ds-text-secondary">
                          One-click OAuth for WooCommerce/Shopify +
                          Gmail/Outlook
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="ds-surface-card rounded-xl p-4 border border-blue-500/20">
                        <div className="flex items-center space-x-2 mb-3">
                          <Store className="h-5 w-5 text-blue-400" />
                          <span className="ds-text-primary font-semibold ds-body-md">
                            E-commerce
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="ds-body-sm ds-text-secondary">
                              WooCommerce
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="ds-body-sm ds-text-secondary">
                              Shopify
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="ds-surface-card rounded-xl p-4 border border-purple-500/20">
                        <div className="flex items-center space-x-2 mb-3">
                          <Mail className="h-5 w-5 text-purple-400" />
                          <span className="ds-text-primary font-semibold ds-body-md">
                            Email
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="ds-body-sm ds-text-secondary">
                              Gmail
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="ds-body-sm ds-text-secondary">
                              Outlook 365
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 lg:order-2">
                <div className="text-center lg:text-left px-4 lg:px-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mb-4 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto lg:mx-0">
                    <Link2 className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-blue-400" />
                  </div>
                  <h4 className="ds-heading-md ds-text-primary mb-3">
                    Link Your Systems
                  </h4>
                  <p className="ds-body-lg ds-text-muted leading-relaxed">
                    Secure OAuth connections mean no API keys to manage. We
                    access your order data and monitor your existing inbox for
                    customer emails—you stay in control.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2: Enable Automations */}
            <div className="flex flex-col lg:flex-row items-center gap-12 stripe-scale-in stripe-stagger-5">
              <div className="flex-1 lg:order-2">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl blur opacity-20"></div>
                  <div className="relative ds-surface-elevated rounded-2xl ds-card-padding shadow-2xl hover:border-green-500/50 transition-all duration-300 stripe-shimmer">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <span className="text-xl sm:text-2xl font-bold text-white">
                          2
                        </span>
                      </div>
                      <div>
                        <h3 className="ds-heading-md ds-text-primary mb-2">
                          Enable Automations
                        </h3>
                        <p className="ds-body-md ds-text-secondary">
                          Toggle AI rules for instant customer responses
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between ds-surface-card rounded-lg p-3 border border-green-500/20">
                        <span className="ds-body-md ds-text-primary font-medium">
                          Order Status Requests
                        </span>
                        <div className="w-10 h-5 sm:w-12 sm:h-6 bg-green-500 rounded-full flex items-center flex-shrink-0">
                          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full ml-0.5 sm:ml-1 shadow transform translate-x-5 sm:translate-x-6"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between ds-surface-card rounded-lg p-3 border border-blue-500/20">
                        <span className="ds-body-md ds-text-primary font-medium">
                          Refunds (Rules Based)
                        </span>
                        <div className="w-10 h-5 sm:w-12 sm:h-6 bg-green-500 rounded-full flex items-center flex-shrink-0">
                          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full ml-0.5 sm:ml-1 shadow transform translate-x-5 sm:translate-x-6"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between ds-surface-card rounded-lg p-3 border border-purple-500/20">
                        <span className="ds-body-md ds-text-primary font-medium">
                          Subscription Changes
                        </span>
                        <div className="w-10 h-5 sm:w-12 sm:h-6 bg-green-500 rounded-full flex items-center flex-shrink-0">
                          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full ml-0.5 sm:ml-1 shadow transform translate-x-5 sm:translate-x-6"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between ds-surface-card rounded-lg p-3 border border-pink-500/20">
                        <span className="ds-body-md ds-text-primary font-medium">
                          Product Questions
                        </span>
                        <div className="w-10 h-5 sm:w-12 sm:h-6 bg-green-500 rounded-full flex items-center flex-shrink-0">
                          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full ml-0.5 sm:ml-1 shadow transform translate-x-5 sm:translate-x-6"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between ds-surface-card rounded-lg p-3 border border-orange-500/20">
                        <span className="ds-body-md ds-text-primary font-medium">
                          Order Cancellations
                        </span>
                        <div className="w-10 h-5 sm:w-12 sm:h-6 bg-green-500 rounded-full flex items-center flex-shrink-0">
                          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full ml-0.5 sm:ml-1 shadow transform translate-x-5 sm:translate-x-6"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 lg:order-1">
                <div className="text-center lg:text-right px-4 lg:px-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mb-4 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto lg:mx-0 lg:ml-auto">
                    <Zap className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-yellow-400" />
                  </div>
                  <h4 className="ds-heading-md ds-text-primary mb-3">
                    Instant Automation
                  </h4>
                  <p className="ds-body-lg ds-text-muted leading-relaxed">
                    Choose which emails get automated responses. AI handles the
                    routine stuff while complex issues still reach you
                    personally.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3: Work Efficiently */}
            <div className="flex flex-col lg:flex-row items-center gap-12 stripe-scale-in stripe-stagger-6">
              <div className="flex-1 lg:order-1">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-20"></div>
                  <div className="relative ds-surface-elevated rounded-2xl ds-card-padding shadow-2xl hover:border-pink-500/50 transition-all duration-300 stripe-shimmer">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <span className="text-xl sm:text-2xl font-bold text-white">
                          3
                        </span>
                      </div>
                      <div>
                        <h3 className="ds-heading-md ds-text-primary mb-2">
                          Train Your AI
                        </h3>
                        <p className="ds-body-md ds-text-secondary">
                          Drop URLs from your website to train on products and
                          policies
                        </p>
                      </div>
                    </div>

                    <div className="ds-surface-card rounded-xl p-4 border border-purple-500/20">
                      <div className="space-y-3">
                        <input
                          placeholder="Drop URL: yourstore.com/faq"
                          className="w-full ds-surface-subtle border border-purple-500/30 rounded-lg px-3 py-2 ds-text-primary placeholder-white/50 ds-body-sm focus:border-purple-400/50 focus:outline-none transition-colors"
                          disabled
                        />
                        <div className="flex items-center justify-between text-xs">
                          <span className="ds-text-secondary">
                            ✓ Product pages
                          </span>
                          <span className="ds-text-secondary">
                            ✓ Return policy
                          </span>
                          <span className="ds-text-secondary">
                            ✓ Brand info
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 lg:order-2">
                <div className="text-center lg:text-left px-4 lg:px-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mb-4 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto lg:mx-0">
                    <Brain className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-purple-400" />
                  </div>
                  <h4 className="ds-heading-md ds-text-primary mb-3">
                    Smart AI Training
                  </h4>
                  <p className="ds-body-lg ds-text-muted leading-relaxed">
                    Just drop URLs from your website. AI automatically scrapes
                    your product pages, policies, and brand info to learn your
                    business and match your voice.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimpleSetup;
