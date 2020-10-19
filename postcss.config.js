const cssnext = require("postcss-cssnext");
const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = {
  plugins: [
    require("postcss-import"),
    require("postcss-nested"),
    require("postcss-easing-gradients"),
    cssnext({
      features: {
        customProperties: {
          preserve: true,
        },
      },
    }),
    // purgecss({
    //   content: ["./**/*.html"],
    // }),
    require("cssnano"),
  ],
};
