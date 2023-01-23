const fs = require("fs");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const pluginTOC = require("eleventy-plugin-toc");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const metagen = require("eleventy-plugin-metagen");
const slugify = require("slugify");
const { parse } = require("node-html-parser");

const slugifyCustom = (s) =>
  slugify(s, { lower: true, remove: /[*+~.()'"!:@]/g });
const hash = (s) =>
  s.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);

// widont is a function that takes a string and replaces the space between the last two words with a non breaking space. This stops typographic widows forming
const widont = (string) => {
  return string.split(" ").length > 2
    ? string.replace(/\s([^\s<]+)\s*$/, "\u00A0$1")
    : string;
};

module.exports = (eleventyConfig) => {
  eleventyConfig.addWatchTarget("./_tmp/style.min.css");
  eleventyConfig.addPassthroughCopy({
    "./_tmp/style.min.css": "./docs/static/style.min.css",
  });

  eleventyConfig.addPassthroughCopy({ img: "/docs/static/img" });
  eleventyConfig.addPassthroughCopy({ js: "/docs/static/js" });
  eleventyConfig.addPassthroughCopy({ video: "/docs/static/video" });

  eleventyConfig.addPlugin(pluginSyntaxHighlight, {
    alwaysWrapLineHighlights: true,
    trim: true,
  });
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(pluginTOC, {
    tags: ["h2", "h3"],
    ul: true,
    wrapperClass: "toc-list",
  });

  eleventyConfig.addPlugin(metagen);

  eleventyConfig.addFilter("widont", widont);
  eleventyConfig.addFilter("extractFirstPara", (content) => {
    const paragraphs = content.match(/<p>(.*?)<\/p>/);
    if (paragraphs) {
      const text = parse(paragraphs[0]).text.substr(0, 160);
      return text.slice(-1) === "."
        ? text
        : text.substr(0, text.lastIndexOf(" ")) + "…";
    }
  });
  eleventyConfig.addGlobalData("currentYear", new Date().getFullYear());

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
    slugify: slugifyCustom,
  };

  markdownIt.renderer.rules.image = (tokens) => {
    // Sometimes this retuns things that arn’t images so we need to filter
    try {
      const [filtered] = tokens.filter((token) => token.type === "image");
      let src = filtered.attrs[filtered.attrIndex("src")][1];
      let width = "";
      let height = "";
      if (src.match(/^http/) === null) {
        src = filtered.attrs[filtered.attrIndex("src")][1].replace(".", "");
        width = filtered.attrs[filtered.attrIndex("width")][1] || "";
        height = filtered.attrs[filtered.attrIndex("height")][1] || "";
      }
      const alt =
        filtered.attrs[filtered.attrIndex("alt")][1] ||
        filtered.children[0].content;
      return `<figure class="mh0 mv5 pa0 border-box bg-snow-light mw6">
      <img class="db" src="/docs/static${src}" alt="${alt}" width="${width}" height="${height}" loading="lazy" />
    </figure>`;
    } catch (e) {
      return `<span class="code radish">Failed to parse image, it could be the path to the image file is incorrect</span>`;
      console.error("can’t find the image");
    }
  };

  markdownIt.core.ruler.push("widont", (state) => {
    const { tokens } = state;

    tokens
      .filter((token) => token.type === "heading_open")
      .forEach((token) => {
        const textToWidont = tokens[tokens.indexOf(token) + 1].children.filter(
          (token) => token.type === "text"
        );

        // Aggregate the next token children text.
        const title = textToWidont.reduce((acc, t) => acc + t.content, "");

        // Replace content with widont applied text
        textToWidont.forEach((token) => {
          if (token.type === "code_inline") token.content = widont(title);
        });
      });
  });

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

  eleventyConfig.addPairedShortcode(
    "snippets",
    (content, languages, method = false) => {
      const languageMap = {
        rb: "Ruby",
        js: "JavaScript",
        node: "Node.js",
        php: "PHP",
        laravel: "Laravel",
        laravelecho: "Laravel Echo",
        go: "Go",
        py: "Python",
        c: ".NET",
        java: "Java",
        bash: "Pusher&nbsp;CLI",
        swift: "Swift",
        objc: "Objective-C",
        http: "http",
        kotlin: "Kotlin",
      };
      return `<div class="bg-snow-light br2 tabbed-snippets" data-method="${method}">
      <nav class="ph3 bb b--smoke overflow-auto scrollbar--light">
        <ul class="flex">
      ${languages
        .map(
          (language, i) =>
            `<li class="mh1"><button class="bn bg-snow-light sans-serif fw6 pt3 pb2 ph2 dragonfruit pointer pa0" data-snippet="language-${language}" data-index="${i}" aria-pressed="${
              i === 0
            }">${languageMap[language] || language}</button></li>`
        )
        .join("\n")}
      </ul>
    </nav>
    ${content}</div>`;
    }
  );

  eleventyConfig.addPairedShortcode(
    "parameter",
    (
      content,
      name,
      type = null,
      required = null,
      language = null,
      show = true
    ) => {
      const typeLabel = `<span class="slate fw6 ml4 f6">${type}</span>`;
      const requiredLabel = `<span class="pumpkin fw6 ml4 f6">Required</span>`;
      const optionalLabel = `<span class="slate fw6 ml4 f6">Optional</span>`;
      const slug = slugifyCustom(`${name}-${hash(content)}`);
      return `<dl class="parameter-block ${show ? "" : "dn"}" ${
        language !== null ? `data-language="${language}"` : ""
      } id="${slug}">
        <dt class="flex items-center mb3">
          <a class="link bn mr4" href="#${slug}">∞</a>
          <span class="code ma0 f4 lh-title" style="font-weight: 400; margin: 0;">${name}</span>${
        type !== null ? typeLabel : ""
      }
          ${
            required === null ? "" : required ? requiredLabel : optionalLabel
          }</dt>
        <dd class="ma0">${content}</dd></dl>`;
    }
  );

  eleventyConfig.addPairedShortcode(
    "conditionalContent",
    (content, language = null, show = true) => {
      return `<div class="parameter-block ${
        show ? "" : "dn"
      }" data-language="${language}">${content}</div>`;
    }
  );

  eleventyConfig.addPairedShortcode("methodwrap", (content) => {
    return `<div class="method-wrapper">${content}</div>`;
  });

  eleventyConfig.addFilter("jsonify", (text) => {
    return JSON.stringify(text).replace(/(?:\\n\s*){2,}/g, "\\n");
  });

  eleventyConfig.addFilter("algExcerpt", (text) => {
    return text
      .replace(/<code class="language-.*?">.*?<\/code>/gs, "")
      .replace(/<.*?>/g, "")
      .substring(0, 8000);
  });

  // Some pages are blank and exist just to show up
  // in the navigation (e.g. beams/concepts/index.md)
  // and we don’t want to index them in search
  eleventyConfig.addCollection("algolia", (collectionApi) => {
    return collectionApi
      .getFilteredByTag("docs")
      .filter((item) => item.url !== false);
  });

  eleventyConfig.setUseGitIgnore(false);

  return {
    templateFormats: ["md", "html", "njk"],
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
