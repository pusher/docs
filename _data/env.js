// BUILD_ENV is set by the release workflow:
//   "production" on main pushes
//   "preview"    on pull requests
//   unset        in local dev (treat as non-production)
//
// Kept named `VERCEL_ENV` historically; the new pipeline sets `BUILD_ENV`
// but we read both so local tools that still export `VERCEL_ENV` keep
// working during the transition.
const env = process.env.BUILD_ENV || process.env.VERCEL_ENV;

module.exports = {
  includeAnalytics: env === "production",
  pusherJSVersion: "8.3.0",
};
