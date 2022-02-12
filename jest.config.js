const debug = process.env === "true";

module.exports = {
  verbose: true,
  collectCoverage: !debug,
  collectCoverageFrom: ["lib/**/*.js", "!**/node_modules/**"],
  moduleNameMapper: {
    "Models/(.*)": "<rootDir>/lib/models/$1",
    "Fix/(.*)": "<rootDir>/tests/fixtures/$1",
    "@config": "<rootDir>/config.json",
    "@index": "<rootDir>/bin/index.js",
    "@mongo": "<rootDir>/lib/db/mongo.js",
    "@pack": "<rootDir>/package.json",
  },
};
