import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**", // all paths under it
      },
      {
        protocol: "https",
        hostname: "q0e18944gkdqacu6.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**", // all paths under it
      },
    ],
  },
};

export default nextConfig;
