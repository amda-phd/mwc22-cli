const chalk = require("chalk");

const Developer = require("Models/developer");
const { error, table } = console;

const all = ["2022-02-28", "2022-03-01", "2022-03-02", "2022-03-03"];

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
    } catch (e) {
      error(`${chalk.red("ERROR:")} ${e.message}`);
    }

    process.exit(1);
  }

  async fetch() {
    try {
      const developers = await Developer.find({});
      table(developers.map((developer) => developer.toObject()));
    } catch (e) {
      error(`${chalk.red("ERROR:")} ${e.message}`);
    }

    process.exit(1);
  }
};
