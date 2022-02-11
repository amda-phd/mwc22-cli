#!/usr/bin/env node

require("module-alias/register");
require("@mongo");

const program = require("@cli");

program.parse();
