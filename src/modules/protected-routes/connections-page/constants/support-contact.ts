/** Public support inbox for integrations / OAuth help CTAs */
export const NEXT_PUBLIC_SUPPORT_EMAIL_FALLBACK = "support@delightdesk.io";

export function getSupportContactEmail(): string {
  const fromEnv =
    typeof process.env.NEXT_PUBLIC_SUPPORT_EMAIL === "string" &&
    process.env.NEXT_PUBLIC_SUPPORT_EMAIL.trim() !== ""
      ? process.env.NEXT_PUBLIC_SUPPORT_EMAIL.trim()
      : null;

  return fromEnv ?? NEXT_PUBLIC_SUPPORT_EMAIL_FALLBACK;
}
