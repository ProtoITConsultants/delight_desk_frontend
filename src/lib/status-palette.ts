/* ------------------------------------------------------------------------- *
 *  Shared status / priority color palette
 *
 *  This is the canonical set of color tokens used across both the Approval
 *  Queue and AI Assistant Escalation Queue. Every stats tile, filter chip,
 *  pill, accent bar, and chart should derive its hue from here so a status
 *  or priority always looks the same wherever it appears in the product.
 *
 *  The palette uses Tailwind's 100/600/700 rung as the working range, with
 *  two deliberate per-family tweaks:
 *    - `amber.softPill` uses text-amber-800 (vs 700) for AAA contrast on
 *      its very light amber-50 background.
 *    - `orange.accentBar` uses 500 (vs 400) so the "hero" accent stays
 *      louder than the calm accent on other statuses.
 * ------------------------------------------------------------------------- */

export type StatusColorFamily =
  | "slate"
  | "sky"
  | "amber"
  | "rose"
  | "emerald"
  | "orange"
  | "violet";

export type StatusColorVariants = {
  /** Saturated dot for status filter dropdown entries / list bullets. */
  dot: string;
  /** Outlined-soft pill background+text+border, used on card status badges. */
  softPill: string;
  /** Thin accent bar painted as a card's left/top color signal. */
  accentBar: string;
  /** Tinted icon container background, used in stats tiles. */
  iconBg: string;
  /** Icon foreground color inside the tinted container. */
  iconColor: string;
  /** Numeric value text color in stats tiles. */
  valueColor: string;
  /** Standalone label text color used by accent labels. */
  labelText: string;
  /** Soft tinted background used for active filter chips. */
  chipActiveBg: string;
};

export const STATUS_COLOR_PALETTE: Record<
  StatusColorFamily,
  StatusColorVariants
> = {
  slate: {
    dot: "bg-slate-400",
    softPill: "bg-slate-50 text-slate-700 border-slate-200",
    accentBar: "bg-slate-400",
    iconBg: "bg-slate-100",
    iconColor: "text-slate-600",
    valueColor: "text-slate-700",
    labelText: "text-slate-700",
    chipActiveBg: "bg-slate-100 text-slate-800 border-slate-300",
  },
  sky: {
    dot: "bg-sky-500",
    softPill: "bg-sky-50 text-sky-700 border-sky-200",
    accentBar: "bg-sky-400",
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
    valueColor: "text-sky-700",
    labelText: "text-sky-700",
    chipActiveBg: "bg-sky-100 text-sky-800 border-sky-300",
  },
  amber: {
    dot: "bg-amber-500",
    softPill: "bg-amber-50 text-amber-800 border-amber-200",
    accentBar: "bg-amber-400",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    valueColor: "text-amber-700",
    labelText: "text-amber-700",
    chipActiveBg: "bg-amber-100 text-amber-900 border-amber-300",
  },
  rose: {
    dot: "bg-rose-500",
    softPill: "bg-rose-50 text-rose-700 border-rose-200",
    accentBar: "bg-rose-400",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
    valueColor: "text-rose-700",
    labelText: "text-rose-700",
    chipActiveBg: "bg-rose-100 text-rose-800 border-rose-300",
  },
  emerald: {
    dot: "bg-emerald-500",
    softPill: "bg-emerald-50 text-emerald-700 border-emerald-200",
    accentBar: "bg-emerald-400",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    valueColor: "text-emerald-700",
    labelText: "text-emerald-700",
    chipActiveBg: "bg-emerald-100 text-emerald-800 border-emerald-300",
  },
  orange: {
    dot: "bg-orange-500",
    softPill: "bg-orange-50 text-orange-700 border-orange-200",
    // 500 rather than 400 — orange is the page's one loud hero color.
    accentBar: "bg-orange-500",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    valueColor: "text-orange-700",
    labelText: "text-orange-700",
    chipActiveBg: "bg-orange-100 text-orange-800 border-orange-300",
  },
  violet: {
    dot: "bg-violet-500",
    softPill: "bg-violet-50 text-violet-700 border-violet-200",
    accentBar: "bg-violet-400",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    valueColor: "text-violet-700",
    labelText: "text-violet-700",
    chipActiveBg: "bg-violet-100 text-violet-800 border-violet-300",
  },
};
