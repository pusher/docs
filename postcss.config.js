const purgecss = require("@fullhuman/postcss-purgecss");
const { VERCEL_ENV } = process.env;
const is_prod_like = VERCEL_ENV === "production" || VERCEL_ENV === "preview";

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
