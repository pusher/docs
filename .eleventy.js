const fs = require("fs");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const pluginTOC = require("eleventy-plugin-toc");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

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
    tags: ["h2", "h3"],
    ul: true,
    wrapperClass: "toc-list",
  });

  eleventyConfig.addFilter("widont", (string) => {
    return string.split(" ").length > 2
      ? string.replace(/\s([^\s<]+)\s*$/, "&nbsp;$1")
      : string;
  });

  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");

  /* Markdown Plugins */
  const markdownIt = require("markdown-it")({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
  });
  const markdownItAnchor = require("markdown-it-anchor");
  const opts = {
    level: [2, 3, 4, 5],
    permalink: true,
    permalinkClass: "link bn",
    permalinkSymbol: "∞",
    permalinkBefore: true,
  };

  markdownIt.renderer.rules.image = (tokens) => {
    const src = tokens[0].attrs[tokens[0].attrIndex("src")][1].replace(".", "");
    const width = tokens[0].attrs[tokens[0].attrIndex("width")][1];
    const height = tokens[0].attrs[tokens[0].attrIndex("height")][1];
    const alt =
      tokens[0].attrs[tokens[0].attrIndex("alt")][1] ||
      tokens[0].children[0].content;
    return `<figure class="mh0 mv5 pa0 border-box bg-snow-light">
      <img class="db" src="${src}" alt="${alt}" width="${width}" height="${height}" loading="lazy" />
    </figure>`;
  };

  markdownIt
    .use(markdownItAnchor, opts)
    .use(require("markdown-it-imsize"), { autofill: true });

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

  eleventyConfig.addPairedShortcode("snippets", function (content, languages) {
    const languageMap = {
      rb: "Ruby",
      js: "Node",
      php: "PHP",
      go: "Go",
      py: "Python",
      c: ".NET",
      java: "Java",
      bash: "Pusher&nbsp;CLI",
    };
    return `<div class="bg-snow-light br2 tabbed-snippets">
      <nav class="ph3 bb b--smoke overflow-auto scrollbar--light">
        <ul class="flex">
      ${languages
        .map(
          (language, i) =>
            `<li class="mh1"><button class="bn bg-snow-light sans-serif fw6 pt3 pb2 ph2 dragonfruit pointer pa0" data-snippet="language-${language}" aria-selected="${
              i === 0
            }">${languageMap[language]}</button></li>`
        )
        .join("\n")}
      </ul>
    </nav>
    ${content}</div>`;
  });

  eleventyConfig.setUseGitIgnore(false);

  return {
    templateFormats: ["md", "html", "njk", "mjs"],
    markdownTemplateEngine: "njk",
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
