import { cn } from "@/lib/utils";
import { TESTIMONIAL_CARD_TYPES } from "@/types/landing-page";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LANDING_PAGE_CONSTANTS } from "../constants";

const TestimonialCard = ({
  rating,
  feedback,
  name,
  role,
  company,
  companyColor,
  avatarUrl,
}: TESTIMONIAL_CARD_TYPES) => (
  <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 stripe-scale-in stripe-stagger-4">
    <div className="flex text-yellow-400 mb-4">
      {Array.from({ length: rating }).map((_, index) => (
        <Star key={index} className="w-5 h-5" />
      ))}
    </div>
    <p className="text-white/80 mb-6 leading-relaxed">&quot;{feedback}&quot;</p>
    <div className="flex items-center space-x-4">
      <Image
        src={avatarUrl}
        width={48}
        height={48}
        alt={name + "-avatar"}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div>
        <div className="font-semibold text-white">{name}</div>
        <div className="text-sm text-white/60">{role}</div>
        <div className={cn("text-sm text-green-400", companyColor)}>
          {company}
        </div>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  return (
    <section className="relative ds-section-padding-mobile bg-gradient-to-br from-green-900/30 via-slate-900 to-emerald-900/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-xl rounded-full px-4 py-2 mb-8 border border-white/20 glass-pulse">
            <Star className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium text-white/90">
              Customer Success
            </span>
          </div>
          <h2 className="ds-heading-lg font-bold mb-6 text-white stripe-fade-in-up stripe-stagger-2">
            Happy{" "}
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Teams
            </span>
          </h2>
          <p className="text-base text-white/70 max-w-3xl mx-auto stripe-fade-in-up stripe-stagger-3">
            How small business teams use Delight Desk to compete with
            enterprise-level support
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {LANDING_PAGE_CONSTANTS.TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="max-w-md mx-auto">
            <p className="text-white/70 mb-6">
              Experience the future of customer service automation in our Beta
              program
            </p>
            <Link
              href="/signup"
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium px-8 py-3 rounded-lg w-full sm:w-fit stripe-scale-in flex items-center justify-center sm:mx-auto"
            >
              Start Free Trial
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
