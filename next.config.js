// @ts-check

/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/

// @ts-ignore
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

// @ts-ignore
module.exports = withPWA({
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
  async redirects() {
    return [
      {
        source: '/signup',
        destination: '/api/auth/login',
        permanent: false,
      },
      {
        source: '/signin',
        destination: '/api/auth/login',
        permanent: false,
      },
      {
        source: '/login',
        destination: '/api/auth/login',
        permanent: false,
      },
      {
        source: '/logout',
        destination: '/api/auth/logout',
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/docs/:slug*',
        destination: 'https://staticshield-docs.vercel.app/:slug*',
      },
    ];
  },
});
