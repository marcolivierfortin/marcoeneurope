import type { NextConfig } from 'next';

export default {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'marcoeneurope.vercel.app',
          },
        ],
        destination: 'https://marcoeneurope.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.marcoeneurope.com',
          },
        ],
        destination: 'https://marcoeneurope.com/:path*',
        permanent: true,
      },
    ];
  },
} as NextConfig;
