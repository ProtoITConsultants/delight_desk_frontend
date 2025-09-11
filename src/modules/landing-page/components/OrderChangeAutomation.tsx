import { cn } from "@/lib/utils";
import {
  ORDER_CHANGE_AUTOMATION_STEPS_TYPES,
  ORDER_CHANGE_AUTOMATION_CARD_TYPES,
} from "@/types/landing-page";
import { LANDING_PAGE_CONSTANTS } from "../constants";
import { RefreshCw } from "lucide-react";

const OrderChangeStep = ({
  Icon,
  heading,
  subheading,
  time,
  className,
}: ORDER_CHANGE_AUTOMATION_STEPS_TYPES) => (
  <div className="flex flex-row md:flex-col items-center gap-4">
    <div
      className={cn(
        "w-12 md:w-16 h-12 md:h-16 rounded-full flex items-center justify-center z-10",
        className
      )}
    >
      {<Icon className="w-6 md:w-8 h-6 md:h-8 text-white" />}
    </div>
    <div className="flex flex-col md:gap-1 items-start md:items-center text-start md:text-center">
      <p className="text-sm font-medium text-white">{heading}</p>
      <div className="flex flex-row md:flex-col items-center gap-1">
        <p className="text-sm text-white/60">{subheading}</p>
        <p className="text-sm text-white/40 block md:hidden">•</p>
        <p className="text-sm text-white/40 md:-mt-0.5">{time}</p>
      </div>
    </div>
  </div>
);

const OrderChangeAutomationCard = ({
  heading,
  subheading,
}: ORDER_CHANGE_AUTOMATION_CARD_TYPES) => (
  <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-4 md:p-6 text-center">
    <h3 className="text-base md:text-lg font-semibold text-white mb-1 md:mb-2">
      {heading}
    </h3>
    <p className="text-sm text-white/60">{subheading}</p>
  </div>
);

const OrderChangeAutomation = () => {
  return (
    <section className="relative ds-section-padding-mobile md:ds-section-padding-desktop overflow-hidden">
      <div className="relative max-w-xl md:max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-xl rounded-full px-4 py-2 mb-6 md:mb-8 border border-white/20 glass-pulse">
            <RefreshCw className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-white/90">
              6-Second Resolution
            </span>
          </div>
          <h2 className="ds-heading-lg font-bold mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Order Changes
            <br />
            <span className="ds-gradient-primary-text">Fully Automated</span>
          </h2>
          <p className="text-white/70 md:max-w-2xl md:mx-auto text-base md:text-lg">
            Cancellations, address changes, order modifications—all handled by
            AI in seconds.
          </p>
        </div>

        {/* Horizontal Timeline - No Card */}
        <div className="md:max-w-6xl md:mx-auto mb-12 md:mb-16">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-6 md:top-8 left-6 md:left-0 md:right-0 w-0.5 md:w-full h-full md:h-0.5 bg-gradient-to-b md:bg-gradient-to-r from-purple-500 via-blue-500 to-green-500"></div>
            {/* Timeline Steps */}
            <div className="md:relative flex flex-col md:flex-row gap-6 md:gap-2 md:justify-between">
              {LANDING_PAGE_CONSTANTS.ORDER_CHANGE_STEPS.map((step, index) => (
                <OrderChangeStep key={index} {...step} />
              ))}
            </div>
          </div>
        </div>

        {/* Use Cases Row */}
        <div className="flex flex-col md:grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 md:max-w-6xl md:mx-auto">
          {LANDING_PAGE_CONSTANTS.ORDER_CHANGE_CARDS.map((card, index) => (
            <OrderChangeAutomationCard key={index} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrderChangeAutomation;
