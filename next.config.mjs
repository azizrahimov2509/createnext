/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.openmoviedb.com",
      },
    ],
  },
};

export default nextConfig;
