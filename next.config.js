import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    optimizeCss: true,
    serverActions: {},
  },
  webpack(config) {
    config.resolve.alias["@"] = path.resolve(__dirname, "app");
    config.resolve.alias["@components"] = path.resolve(__dirname, "components");
    config.resolve.alias["@lib"] = path.resolve(__dirname, "lib");
    return config;
  },
};

export default nextConfig;
