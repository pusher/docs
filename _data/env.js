require("dotenv").config();

module.exports = {
  includeAnalytics: process.env.VERCEL_ENV === "production",
};