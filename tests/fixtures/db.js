const mongoose = require("mongoose");

const Developer = require("Models/developer");

const developer0 = {
  _id: new mongoose.Types.ObjectId(),
  name: "Tester0",
  email: "teste0@test.com",
  phone: "275-2389-89",
  category: "Front",
  dates: ["2022-02-28", "2022-03-01"],
};

const developer1 = {
  name: "Tester1",
  email: "teste1@test.com",
  phone: "275-2389-89",
  category: "Front",
  dates: ["2022-02-28", "2022-03-03"],
};

const developers = [developer0, developer1];

const setupDatabase = async () => {
  require("@mongo");
  await Developer.deleteMany();
  await Developer.create(developer0);
};

module.exports = { developers, setupDatabase };
