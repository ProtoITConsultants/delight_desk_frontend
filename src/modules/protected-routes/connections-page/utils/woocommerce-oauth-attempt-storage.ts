const STORAGE_KEY = "delightdesk_woocommerce_oauth_attempted";

export type WooCommerceOAuthAttempt = {
  storeUrl: string;
};

function readRaw(): WooCommerceOAuthAttempt | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as unknown;
    if (
      parsed &&
      typeof parsed === "object" &&
      "storeUrl" in parsed &&
      typeof (parsed as WooCommerceOAuthAttempt).storeUrl === "string"
    ) {
      return { storeUrl: (parsed as WooCommerceOAuthAttempt).storeUrl };
    }

    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function setWooCommerceOAuthAttempt(storeUrl: string): void {
  if (typeof window === "undefined") return;

  try {
    const trimmed = storeUrl.trim();
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ storeUrl: trimmed }),
    );
  } catch {
    // ignore quota / privacy mode
  }
}

export function getWooCommerceOAuthAttempt(): WooCommerceOAuthAttempt | null {
  return readRaw();
}

export function clearWooCommerceOAuthAttempt(): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

/** Human-friendly store label for guide copy (hostname when possible). */
export function formatStoreUrlForDisplay(storeUrl: string): string {
  const trimmed = storeUrl.trim();
  if (!trimmed) return "";

  try {
    const withScheme = /^https?:\/\//i.test(trimmed)
      ? trimmed
      : `https://${trimmed}`;
    return new URL(withScheme).hostname || trimmed;
  } catch {
    return trimmed;
  }
}
