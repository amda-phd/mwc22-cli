#!/usr/bin/env node

require("module-alias/register");
const { program } = require("commander");
const chalk = require("chalk");
const { log } = console;

const { version, description, name } = require("@pack");

program
  .name(name)
  .description(description)
  .version(version)
  .option("-v0, --initialVelocity <velocity>")
  .parse();

log(chalk.blue("Hello World!"));
const options = program.opts();
if (options.initialVelocity) console.log(options.initialVelocity);
