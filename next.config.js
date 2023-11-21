/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "img.clerk.com" },
      { hostname: "xsoxfzhkvtcqsnkyfwnb.supabase.co" },
    ],
  },
};

module.exports = nextConfig;
