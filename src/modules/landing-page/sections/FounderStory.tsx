import { User } from "lucide-react";
import Image from "next/image";
import founderImage from "@/assets/images/landing-page/founder-image.jpg";

const FounderStory = () => {
  return (
    <section className="relative ds-section-padding-mobile bg-gradient-to-br from-orange-900/20 via-slate-900 to-red-900/20">
      <div className="ds-container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-xl rounded-full px-4 py-2 mb-8 border border-white/20">
              <User className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-medium text-white/90">
                Founder Story
              </span>
            </div>
            <h2 className="ds-heading-lg font-bold mb-6 text-white">
              Created by E-commerce Teams,
              <br className="hidden lg:block" />{" "}
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                for E-commerce Teams
              </span>
            </h2>
          </div>

          {/* Split Layout: Photo + Article */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Founder Photo - Left Sidebar */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-8">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur opacity-30"></div>
                  <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-2">
                    <Image
                      src={founderImage}
                      width={216.66}
                      height={320}
                      alt="Remy Tennant - Founder of Delight Desk"
                      className="w-full h-80 object-cover object-center rounded-xl"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-xl">
                      <h3 className="text-white font-bold text-lg mb-1">
                        Remy Tennant
                      </h3>
                      <p className="text-white/80 text-sm mb-2">
                        Founder of Delight Desk
                      </p>
                      <div className="flex space-x-2">
                        <a
                          href="https://linkedin.com/in/remytennant"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded flex items-center justify-center hover:bg-white/30 transition-colors"
                        >
                          {/* Linkedin - Svg */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="w-3 h-3 text-white"
                          >
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                            <rect width="4" height="12" x="2" y="9" />
                            <circle cx="4" cy="4" r="2" />
                          </svg>
                        </a>
                        <a
                          href="https://instagram.com/remytennant"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded flex items-center justify-center hover:bg-white/30 transition-colors"
                        >
                          {/* Instagram - Svg */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="w-3 h-3 text-white"
                          >
                            <rect
                              width="20"
                              height="20"
                              x="2"
                              y="2"
                              rx="5"
                              ry="5"
                            />
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <div className="lg:col-span-2">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
                <div className="prose prose-lg prose-invert max-w-none">
                  <p className="text-white/70 leading-relaxed mb-6">
                    Running Human Food Bar, I lived the daily reality every D2C
                    founder knows too well. Customers expect Amazon-level
                    service, but delivering that level of support was slowly
                    eating into our margins. Legacy solutions felt
                    ancient—clunky interfaces, expensive per-agent pricing, and
                    zero intelligence.
                  </p>

                  <p className="text-white/70 leading-relaxed mb-6">
                    With my software background, I saw an opportunity to build
                    an AI agent that actually understood customer context and
                    emotion. I engineered a system that integrated seamlessly
                    with our existing tools—no expensive migrations, no team
                    retraining.
                  </p>

                  <p className="text-white/70 leading-relaxed">
                    The results were immediate. Support costs dropped while
                    customer satisfaction soared. When customers started
                    praising our &quot;new support team&quot;, I knew other
                    merchants needed this transformation too. That&apos;s when
                    building Delight Desk became an imperative.
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

export default FounderStory;
