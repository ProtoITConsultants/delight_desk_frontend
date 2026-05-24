"use client";
import { FC } from "react";
import { cn } from "@/lib/utils";

/**
 * Compact horizontal meter for the AI confidence score. The bar fills
 * in proportion to confidence and the tone shifts across three bands:
 *   - >= 80%  emerald  ("trust this one")
 *   - >= 60%  amber    ("review carefully")
 *   - <  60%  rose     ("manual judgement preferred")
 */
type ConfidenceMeterProps = {
  confidence: number;
  className?: string;
};

const getTone = (confidence: number) => {
  if (confidence >= 80) {
    return {
      bar: "bg-emerald-500",
      text: "text-emerald-700",
      label: "High confidence",
    };
  }
  if (confidence >= 60) {
    return {
      bar: "bg-amber-500",
      text: "text-amber-700",
      label: "Medium confidence",
    };
  }
  return {
    bar: "bg-rose-500",
    text: "text-rose-700",
    label: "Low confidence",
  };
};

const ConfidenceMeter: FC<ConfidenceMeterProps> = ({
  confidence,
  className,
}) => {
  const value = Math.max(0, Math.min(100, Math.round(confidence)));
  const tone = getTone(value);

  return (
    <div
      className={cn(
        "flex items-center gap-2",
        className,
      )}
      title={`${tone.label}: ${value}%`}
    >
      <div
        className="relative h-1.5 w-24 overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        aria-label="AI confidence"
      >
        <span
          className={cn(
            "absolute inset-y-0 left-0 rounded-full transition-all",
            tone.bar,
          )}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className={cn("text-xs font-semibold tabular-nums", tone.text)}>
        {value}%
      </span>
    </div>
  );
};

export default ConfidenceMeter;
