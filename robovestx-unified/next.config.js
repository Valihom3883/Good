/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('mongoose', 'jsonwebtoken', 'winston', 'winston-daily-rotate-file', 'bcryptjs', 'recharts', 'next-themes', 'react-hot-toast');
    }
    return config;
  },
};

module.exports = nextConfig;
