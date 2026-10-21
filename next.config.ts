import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      // The Stripe webhook endpoint is registered as https://shop.aquacubes.fish/webhook.
      // A rewrite (not a redirect) keeps the POST body intact for signature checks.
      { source: "/webhook", destination: "/api/stripe/webhook" },
    ];
  },
  async redirects() {
    // Old English URLs and the static b2b site's *.html links → German routes.
    return [
      { source: "/about", destination: "/ueber-uns", permanent: true },
      { source: "/contact", destination: "/kontakt", permanent: true },
      { source: "/privacy", destination: "/datenschutz", permanent: true },
      { source: "/terms", destination: "/agb", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      // The leasing configurator replaces the old shop + cart pages.
      { source: "/shop", destination: "/leasing", permanent: true },
      { source: "/shop/starter", destination: "/leasing?pkg=starter", permanent: true },
      { source: "/shop/micro-farms", destination: "/leasing?pkg=micro", permanent: true },
      { source: "/shop/enterprise", destination: "/kontakt", permanent: true },
      { source: "/shop/:path*", destination: "/leasing", permanent: true },
      { source: "/checkout", destination: "/leasing", permanent: true },
      { source: "/checkout/success", destination: "/danke", permanent: true },
      { source: "/leasing.html", destination: "/leasing", permanent: true },
      { source: "/danke.html", destination: "/danke", permanent: true },
      {
        source:
          "/:page(ueber-uns|kontakt|faq|distributor|blog|impressum|agb|datenschutz|widerruf|zahlung-lieferung|elektrog).html",
        destination: "/:page",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
