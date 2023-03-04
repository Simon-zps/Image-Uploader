module.exports = {
  // ...
  webpack: {
    configure: {
      experiments: {
        topLevelAwait: true,
      },
    },
    plugins: {
      add: [
        /* ... */
      ],
      remove: [
        /* ... */
      ],
    },
    configure: {
      /* ... */
    },
    configure: (webpackConfig, { env, paths }) => {
      /* ... */
      return webpackConfig;
    },
  },
};
