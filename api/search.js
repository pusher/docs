import algoliasearch from "algoliasearch";
const { ALGOLIA_SEARCH_KEY } = process.env;

const client = algoliasearch("BQ93464WAA", ALGOLIA_SEARCH_KEY);
const searchIndex = client.initIndex("docs");

module.exports = async (req, res) => {
  const { t: searchTerm } = req.query;

  try {
    const { hits: results } = await searchIndex.search(searchTerm, {
      hitsPerPage: 10,
      attributesToRetrieve: ["title", "url"],
      attributesToSnippet: ["content"],
      snippetEllipsisText: "…",
    });

    // res.status(200).send(results);

    res.status(200).send(
      `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Search results for "${searchTerm}"</title>
        </head>
        <body>
          <h1 class="f1">Search results for "${searchTerm}"</h1>
          <ul>
            ${results
              .map(
                (result) =>
                  `<li><a href="${result.url}" class="db">${result.title}</a></li>`
              )
              .join("")}
          </ul>
        </body>
      </html>`
    );
  } catch (error) {
    res.status(500).send(`There was an error processing his request: ${error}`);
  }
};
