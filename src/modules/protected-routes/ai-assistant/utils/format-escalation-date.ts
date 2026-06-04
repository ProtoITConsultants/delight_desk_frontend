import { format, formatDistanceToNowStrict } from "date-fns";

/**
 * Centralised formatting for any timestamp the AI Assistant surfaces.
 *
 *  - `relative`   – "3 minutes ago", "2 days ago". Always short, no suffixes
 *                   like "about" so it reads cleanly in tight badges.
 *  - `absolute`   – "May 23, 2026 · 8:08 PM". Used for the detail header
 *                   where users may need to know the year/exact time.
 *
 * Every helper handles invalid / missing input by returning `"Unknown"` so
 * the surrounding UI never has to special-case nulls.
 */

const UNKNOWN = "Unknown";

const parse = (input: string | null | undefined): Date | null => {
  if (!input) return null;
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return null;
  return d;
};

export const formatRelativeTime = (input: string | null | undefined): string => {
  const d = parse(input);
  if (!d) return UNKNOWN;
  return formatDistanceToNowStrict(d, { addSuffix: true });
};

export const formatAbsoluteDateTime = (
  input: string | null | undefined,
): string => {
  const d = parse(input);
  if (!d) return UNKNOWN;
  return format(d, "MMM d, yyyy · h:mm a");
};
