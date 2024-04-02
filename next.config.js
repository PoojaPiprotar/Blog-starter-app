// config file to set configration for used image URLs.

module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'cdn.pixabay.com',
          port: '',
          pathname: '/photo/**',
        },
        {
            protocol: 'https',
            hostname: 'via.placeholder.com',
            port: '',
            pathname: '/600/**',
          },
      ],
    },
  }
  