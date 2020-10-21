const fs = require("fs");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const pluginTOC = require("eleventy-plugin-toc");
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = (eleventyConfig) => {
  eleventyConfig.addWatchTarget("./_tmp/style.min.css");
  eleventyConfig.addPassthroughCopy({
    "./_tmp/style.min.css": "./style.min.css",
  });

  eleventyConfig.addPlugin(pluginSyntaxHighlight, {
    alwaysWrapLineHighlights: true,
  });
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(pluginTOC, {
    ul: true,
    wrapperClass: "nested-list-reset",
  });

  eleventyConfig.addFilter("widont", (string) => {
    return string.split(" ").length > 2
      ? string.replace(/\s([^\s<]+)\s*$/, "&nbsp;$1")
      : string;
  });

  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("css");

  /* Markdown Plugins */
  const markdownIt = require("markdown-it")({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
  });
  const markdownItAnchor = require("markdown-it-anchor");
  const opts = {
    permalink: true,
    permalinkClass: "link bn",
    permalinkSymbol: "∞",
    permalinkBefore: true,
  };

  markdownIt.renderer.rules.image = (tokens) => {
    const src = tokens[0].attrs[tokens[0].attrIndex("src")][1].replace('.', '');
    const width = tokens[0].attrs[tokens[0].attrIndex("width")][1];
    const height = tokens[0].attrs[tokens[0].attrIndex("height")][1];
    const alt =
      tokens[0].attrs[tokens[0].attrIndex("alt")][1] || tokens[0].content;
    return `<figure class="mh0 mv5 pa0 border-box bg-snow-light">
      <img class="db" src="${src}" alt="${alt}" width="${width}" height="${height}" loading="lazy" />
    </figure>`;
  };

  markdownIt
    .use(markdownItAnchor, opts)
    .use(require('markdown-it-imsize'), { autofill: true })

  eleventyConfig.setLibrary("md", markdownIt);

  // Browsersync Overrides
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, browserSync) {
        const content_404 = fs.readFileSync("_site/404.html");

        browserSync.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      },
    },
    ui: false,
    ghostMode: false,
  });

  return {
    templateFormats: ["md", "html", "njk", "liquid"],
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,

    dir: {
      input: ".",
      includes: "_includes",
      output: "_site",
    },
  };
};
