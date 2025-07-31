module.exports = {
  // Mark backend dependencies as external
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        "jsonwebtoken": false,
        "mongoose": false,
        "winston-daily-rotate-file": false
      };
    }

    // Add server-side external packages
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push(
        /^(jsonwebtoken|mongoose|winston-daily-rotate-file)$/
      );
    }

    return config;
  },

  // Enable standalone output
  output: "standalone",

  // Configure module path aliases
  experimental: {
    externalDir: true,
    serverComponentsExternalPackages: ["mongoose", "jsonwebtoken"]
  }
};
