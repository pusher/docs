const cssnext = require('postcss-cssnext');

module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-nested'),
    require('postcss-easing-gradients'),
    cssnext({
      features: {
        customProperties: {
          preserve: true
        }
      }
    }),
    require('cssnano')
  ]
};
