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
  async redirects() {
    // Old English URLs and the static b2b site's *.html links → German routes.
    return [
      { source: "/about", destination: "/ueber-uns", permanent: true },
      { source: "/contact", destination: "/kontakt", permanent: true },
      { source: "/privacy", destination: "/datenschutz", permanent: true },
      { source: "/terms", destination: "/agb", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
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
