import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Disables TypeScript errors during build
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignores ESLint errors during build
  },
  env: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    VIRUSTOTAL_API_KEY: process.env.VIRUSTOTAL_API_KEY,
  },
};

export default nextConfig;
