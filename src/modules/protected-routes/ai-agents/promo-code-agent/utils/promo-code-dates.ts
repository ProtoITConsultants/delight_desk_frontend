import { formatDistanceToNow, isValid } from "date-fns";

/**
 * Robust parse for backend date strings / nullable fields — avoids RangeError /
 * “Invalid time value” from Date / date-fns when ISO is missing or malformed.
 */
export function parseStableDate(input: unknown): Date | null {
  if (input === null || input === undefined) return null;
  if (input instanceof Date) {
    return isValid(input) ? input : null;
  }
  if (typeof input === "string") {
    const s = input.trim();
    if (s === "") return null;
    const d = new Date(s);
    return isValid(d) ? d : null;
  }
  if (typeof input === "number" && Number.isFinite(input)) {
    const d = new Date(input);
    return isValid(d) ? d : null;
  }
  return null;
}

/** Relative time label or `null` if the input is missing or unparsable. */
export function formatRelativeSafe(input: unknown): string | null {
  const d = parseStableDate(input);
  if (!d) return null;
  return formatDistanceToNow(d, { addSuffix: true });
}
