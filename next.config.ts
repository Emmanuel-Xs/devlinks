// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u/**",
        search: "?v=*",
      },
      {
        protocol: "https",
        hostname: `${process.env.UPLOADTHING_APP_ID}.ufs.sh`,
        pathname: "/f/*",
      },
    ],
  },
  experimental: {
    reactCompiler: true,
  },
  compiler:
    process.env.NODE_ENV === "production"
      ? {
          removeConsole: {
            exclude: ["error", "warn"],
          },
        }
      : undefined,
};

export default nextConfig;
