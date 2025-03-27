/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_URL: process.env.API_URL || 'http://localhost:8000',
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_URL || 'http://localhost:8000'}/api/:path*`,
      },
      // Add rewrite for TradingView library's UDF data feed if using an external source
      {
        source: '/tradingview-api/:path*',
        destination: `${process.env.TRADINGVIEW_API_URL || 'https://demo_feed.tradingview.com'}/:path*`,
      },
    ];
  },
  // Static asset handling - ensure TradingView library files are properly served
  async headers() {
    return [
      {
        // Headers for TradingView library files
        source: '/charting_library/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // CORS headers for API endpoints
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ];
  },
  webpack: (config, { isServer }) => {
    // Exclude TypeScript declaration files from bundling
    config.module.rules.push({
      test: /\.d\.ts$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'ignore-loader',
        },
      ],
    });

    if (!isServer) {
      // Fix issue with browser modules in server context
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }

    // Critical fix: prevent Highcharts from loading during SSR
    if (isServer) {
      config.externals.push('highcharts', 'highcharts/highstock');
      
      // Also prevent TradingView library from loading during SSR
      config.externals.push('TradingView');
    }

    return config;
  },
};

module.exports = nextConfig; 