const isProduction = process.env.NODE_ENV === "production"

const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.public.blob.vercel-storage.com https://www.google.com https://maps.google.com https://maps.googleapis.com",
  "font-src 'self' data:",
  "connect-src 'self' https://*.public.blob.vercel-storage.com https://vitals.vercel-insights.com",
  "frame-src 'self' https://maps.google.com https://www.google.com",
  "media-src 'self' blob: https://*.public.blob.vercel-storage.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  ...(isProduction ? ["upgrade-insecure-requests"] : []),
]
  .join("; ")
  .replace(/\s{2,}/g, " ")
  .trim()

/** Security headers expected by scanners (HSTS, CSP, X-Frame-Options, etc.) */
export const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
  },
  {
    key: "Content-Security-Policy",
    value: contentSecurityPolicy,
  },
  ...(isProduction
    ? [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ]
    : []),
]
