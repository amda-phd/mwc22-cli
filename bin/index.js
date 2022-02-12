#!/usr/bin/env node

require("module-alias/register");
const { connect } = require("@mongo");
connect();

const program = require("@cli");

program.parse();

// TODO: Include other interfaces, such as REST or the ability to importe the package and use its files
