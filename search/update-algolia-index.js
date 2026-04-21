const algoliasearch = require("algoliasearch");
const records = require("../_site/search/all.json");

// BUILD_ENV is set by the release workflow (see .github/workflows/release.yml).
// `VERCEL_ENV` is accepted as a fallback so the existing pipeline keeps
// working during the transition off Vercel.
const { ALGOLIA_UPDATE_KEY } = process.env;
const env = process.env.BUILD_ENV || process.env.VERCEL_ENV;

if (env !== "production") {
  console.log(`Skipping Algolia update because env=${env || "unset"} (expected "production").`);
  process.exit(0);
}

if (!ALGOLIA_UPDATE_KEY) {
  console.error(
    "ALGOLIA_UPDATE_KEY is not set but env=production. Refusing to run a production build without the Algolia key."
  );
  process.exit(1);
}

const client = algoliasearch("BQ93464WAA", ALGOLIA_UPDATE_KEY);
const index = client.initIndex("docs");

index
  .replaceAllObjects(records, { autoGenerateObjectIDIfNotExist: true })
  .then(() => console.log("Algolia index updated"))
  .catch((error) => {
    console.error("Failed to update Algolia index", error);
    process.exit(1);
  });
