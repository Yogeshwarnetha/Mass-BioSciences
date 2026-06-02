import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'sgpshtest.blob.core.windows.net' },
      { protocol: 'https', hostname: 'propertysourcehub.co.uk' },
      { protocol: 'https', hostname: 'www.gbdarchitects.com' },
      { protocol: 'https', hostname: '5.imimg.com' },
      { protocol: 'https', hostname: 'media.istockphoto.com' },
      { protocol: 'https', hostname: 'example.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev' },
      { protocol: 'https', hostname: 'pub-5508d64e14364eca9f48ef0efa18bda5.r2.dev' },
      { protocol: 'https', hostname: 'pub-837447cab048469baef2e30fbd0a9877.r2.dev' },
    ],
  },
};

export default nextConfig;
