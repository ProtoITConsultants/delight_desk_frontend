import { Clock, ShieldCheck, TrendingUp } from "lucide-react";
import { PLAN_VALUE_CARD_PROPS } from "../../types/value-card";

export const VALUE_PROP_CARDS_DATA = <PLAN_VALUE_CARD_PROPS[]>[
  {
    Icon: Clock,
    heading: "Save 20+ Hours Weekly",
    subheading:
      "Automate order status, refunds, and subscription management so you can focus on growing your business.",
    iconBackgroundClasses: "bg-blue-100",
    iconClasses: "text-blue-600",
  },
  {
    Icon: ShieldCheck,
    heading: "100% Confidence Rule",
    subheading:
      "AI only handles simple transactional requests. Complex issues stay with humans for perfect customer care.",
    iconBackgroundClasses: "bg-green-100",
    iconClasses: "text-green-600",
  },
  {
    Icon: TrendingUp,
    heading: "75% Faster Resolution",
    subheading:
      "Instant responses for order tracking, promo codes, and subscription changes. Happy customers, less work.",
    iconBackgroundClasses: "bg-purple-100",
    iconClasses: "text-purple-600",
  },
];
