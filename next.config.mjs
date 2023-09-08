export default {
  reactStrictMode: true,
  i18n: {

    // Define the available locales for the application.
    locales: [
      'fr',
    ],

    // Define the default locale for the application.
    defaultLocale: 'fr',
  },
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
};
