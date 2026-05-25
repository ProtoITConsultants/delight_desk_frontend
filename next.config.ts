import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  /**
   * Same-origin API proxy for local development.
   *
   * Browsers treat the session cookie set by `api.delightdesk.io` as a
   * third-party cookie when the frontend runs on `localhost:3000`, which
   * Chrome (and other browsers) block by default in Incognito. Routing API
   * calls through `/api-proxy/...` on the dev server makes the cookie
   * first-party for `localhost:3000`, so auth works in any browser/mode.
   *
   * To use it, set in `.env.local`:
   *   NEXT_PUBLIC_API_URL=/api-proxy
   *
   * The upstream target can be overridden per environment via
   * `API_PROXY_TARGET` (server-only env var; not exposed to the browser).
   * In production where `NEXT_PUBLIC_API_URL` points at an absolute URL,
   * nothing ever hits `/api-proxy/*`, so this rewrite is a no-op there.
   */
  async rewrites() {
    const target =
      process.env.API_PROXY_TARGET ?? "https://api.delightdesk.io";
    return [
      {
        source: "/api-proxy/:path*",
        destination: `${target}/:path*`,
      },
    ];
  },
};

export default nextConfig;
