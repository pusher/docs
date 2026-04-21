const purgecss = require("@fullhuman/postcss-purgecss");

// BUILD_ENV is set by the release workflow (see .github/workflows/release.yml).
// `VERCEL_ENV` is accepted as a fallback so the pipeline keeps working during
// the transition off Vercel and for anyone still exporting it locally.
const env = process.env.BUILD_ENV || process.env.VERCEL_ENV;
const is_prod_like = env === "production" || env === "preview";

module.exports = {
  plugins: [
    require("postcss-import"),
    require("postcss-nested"),
    require("postcss-each"),
    require("postcss-colour-functions"),
    require("postcss-flexbugs-fixes"),
    require("postcss-custom-media"),
    require("postcss-preset-env")({
      autoprefixer: {
        flexbox: "no-2009",
      },
      stage: 3,
    }),
    ...(is_prod_like
      ? [
          purgecss({
            content: ["**/*.njk", "**/*.mjs", ".eleventy.js"],
            safelist: {
              standard: [/^toc-list/, /^flash-popup/],
              deep: [/^search-snippet/, /^blockquote/, /^th/],
            },
          }),
          require("cssnano"),
        ]
      : []),
  ],
};
