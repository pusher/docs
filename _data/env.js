require("dotenv").config();

module.exports = {
  includeAnalytics: process.env.ELEVENTY_PRODUCTION === true,
};
