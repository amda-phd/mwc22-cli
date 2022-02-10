const debug = process.env === "true";

module.exports = {
  verbose: true,
  collectCoverage: !debug,
  collectCoverageFrom: ["bin/*.js", "!**/node_modules/**"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
};
