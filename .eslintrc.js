"use strict";

module.exports = {
  env: {
    es2020: true,
    node: true,
    "jest/globals": true,
  },
  extends: ["eslint:recommended", "prettier"],
  plugins: ["jest"],
};
