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
};
