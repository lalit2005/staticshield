// @ts-check

/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/

module.exports = {
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
  async headers() {
    return [
      {
        // matching all API routes
        source: '/api/verify-token',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
};
