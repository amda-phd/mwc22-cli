const { program } = require("commander");
const chalk = require("chalk");
const { log } = console;

const { version, description, name } = require("@pack");
const Commands = require("Func/developer");
const { addOne, fetch, importJSON } = new Commands();

program.name(name).description(description).version(version);

// TODO: Better and prettier information returned in info command
program
  .command("info")
  .description("Some information about the MWC22")
  .action(() => {
    log(
      chalk.blue("MWC Barcelona") +
        " is an annual trade show organised by GSMA, dedicated primarily to the mobile communications industry. The event is held in Barcelona, Catalonia, Spain at the Fira de Barcelona Gran Via, usually in February or early-March."
    );
    log(
      chalk.blue("MWC Barcelona") +
        " will be back from the 28th February to the 3rd March 2022. Buy your pass today!"
    );
    log(
      "Enter " +
        chalk.bold("`mwc22 addDeveloper`") +
        " in your terminal to sign up as a developer."
    );
    process.exit(1);
  });

program
  .command("addDeveloper")
  .description(
    "Add a new developer and their attendance information to the database"
  )
  .option("-n, --name <name>", "The developer's complete name")
  .option(
    "-e, --email <email>",
    "A valid email address. Remember, each email address can only be registered once."
  )
  .option(
    "-p, --phone <phone>",
    "Phone number. Remember to add your international code"
  )
  .option(
    "-c, --category <category>",
    "Choose the more suitable from Front, Back, Data and Mobile."
  )
  .option(
    "-d, --dates [dates]",
    "List of the dates that the developeP will attend in format YYYY-MM-DD separated by commas. If this argument isn't provided, we will assume that the developer will attend to the complete event."
  )
  .action(addOne);

program
  .command("importJSON")
  .description(
    "Provide the file name of a JSON file containing one or various developers to be included in the database. " +
      chalk.yellow("BEWARE:") +
      " If any register isn't considered valid, it won't be added to the database and a warning will be displayed."
  )
  .argument("<fileName>")
  .action(importJSON);

// TODO: Include the ability to filter, sort and limit in the developers command
program
  .command("developers")
  .description("Get all the developers attending to the MWC22")
  .action(fetch);

module.exports = program;
