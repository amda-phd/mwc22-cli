const { program } = require("commander");

const { version, description, name } = require("@pack");
const Commands = require("Func/developer");
const { addOne } = new Commands();

program.name(name).description(description).version(version);

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
    "List of the dates that the developer will attend in format YYYY-MM-DD separated by commas. If this argument isn't provided, we will assume that the developer will attend to the complete event."
  )
  .action(addOne);

module.exports = program;
