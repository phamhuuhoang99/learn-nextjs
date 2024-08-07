/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'placehold.co', 'js-post-api.herokuapp.com'],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
    };

    return config;
  },
};
