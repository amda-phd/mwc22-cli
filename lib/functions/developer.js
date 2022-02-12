const chalk = require("chalk");
const { resolve } = require("path");
const { readFileSync } = require("fs");

const Developer = require("Models/developer");
const { error, warn, table, log } = console;

const all = ["2021-02-28", "2021-03-01", "2021-03-02", "2021-03-03"];

// TODO: Make this functions more general via wrapper so that they can be reused in other possible interfaces, such as REST or package importation

module.exports = class Commands {
  async addOne({ name, email, phone, category, dates }) {
    try {
      const developer = await Developer.create({
        name,
        email,
        phone,
        category,
        dates: dates ? dates.split(",") : all,
      });
      table(developer.toObject());
      process.exit(1);
    } catch (e) {
      error(`${chalk.red("ERROR:")} ${e.message}`);
      process.exit(0);
    }
  }

  async importJSON(fileName) {
    const path = resolve(fileName);
    try {
      readFileSync(path);
    } catch (error) {
      error(`${chalk.red("ERROR:")} Invalid source file name`);
      process.exit(0);
    }

    const input = require(path);
    const total = input.length;
    let added = 0;
    for (const item of input) {
      try {
        let developer = await Developer.findOne({ email: item.email });
        if (!developer) {
          developer = await Developer.create({
            ...item,
            dates: item.date,
          });
          added++;
        } else {
          developer.dates.push(item.date);
          await developer.save();
        }
      } catch (e) {
        warn(
          `${chalk.yellow("WARN:")} Developer ${
            item.email
          } couldn't be registered due to ${e.message}`
        );
      }
    }

    log(
      `${added} Developers of the ${total} contained in the provided JSON added to the database.`
    );
    process.exit(1);
  }

  async fetch() {
    try {
      const developers = await Developer.find({});
      table(developers.map((developer) => developer.toObject()));
      process.exit(1);
    } catch (e) {
      error(`${chalk.red("ERROR:")} ${e.message}`);
      process.exit(0);
    }
  }
};
