const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [],
    rehypePlugins: [],
    providerImportSource: "@mdx-js/react",
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  output: "export",
  swcMinify: true,
  // compiler: {
  //   emotion: true,
  // },
  reactStrictMode: true,
  experimental: {
    // swcTraceProfiling: true,
    mdxRs: true,
    appDir: true,
    turbo: {
      loaders: {
        // Option format
        ".md": [
          {
            loader: "@mdx-js/loader",
            options: {
              format: "md",
            },
          },
        ],
        // Option-less format
        ".mdx": ["@mdx-js/loader"],
      },
    },
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = { fs: false };
    }

    return config;
  },
  trailingSlash: true,
  transpilePackages: ["react-syntax-highlighter"],
  // webpack: (config) => {
  //   config.resolve.fallback = { fs: false };

  //   return config;
  // },
};

module.exports = withMDX(nextConfig);
