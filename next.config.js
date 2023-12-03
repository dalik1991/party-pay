/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverComponentsExternalPackages: ["mongoose"],
    },
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "lh3.googleusercontent.com",
        },
      ],
    },
    webpack(config) {
      // Grab the existing rule that handles SVG imports
      const fileLoaderRule = config.module.rules.find((rule) =>
        rule.test?.test?.('.svg'),
      )
      config.module.rules.push(
        // Reapply the existing rule, but only for svg imports ending in ?url
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/, // *.svg?url
        },
        // Convert all other *.svg imports to React components
        {
          test: /\.svg$/i,
          issuer: fileLoaderRule.issuer,
          resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
          use: {
            loader: '@svgr/webpack',
            options: {
               svgoConfig: {
                  plugins: [{
                     name: 'removeViewBox',
                     active: false
                  }]
               }
            }
         }
        },
      )

      fileLoaderRule.exclude = /\.svg$/i

      config.experiments = {
        ...config.experiments,
        topLevelAwait: true,
      }
      return config
    }
  }
  
  module.exports = nextConfig