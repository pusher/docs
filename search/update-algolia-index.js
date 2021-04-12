const algoliasearch = require("algoliasearch");
const records = require("../_site/search/all.json");
const { ALGOLIA_API_KEY, VERCEL_ENV } = process.env;

if (VERCEL_ENV === "production") {
  const client = algoliasearch("BQ93464WAA", ALGOLIA_API_KEY);
  const index = client.initIndex("docs");

  index.saveObjects(records, { autoGenerateObjectIDIfNotExist: true });
  console.log("Algolia index updated");
} else {
  console.log("Skipped Algolia update because this is not production");
}
