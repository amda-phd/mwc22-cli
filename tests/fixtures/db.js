const mongoose = require("mongoose");
const { connect, disconnect } = require("@mongo");

const Developer = require("Models/developer");

const developer0 = {
  _id: new mongoose.Types.ObjectId(),
  name: "Tester0",
  email: "teste0@test.com",
  phone: "765023987",
  category: "Front",
  dates: ["2021-02-28", "2021-03-01"],
};

const developer1 = {
  name: "Tester1",
  email: "teste1@test.com",
  phone: "+34653981205",
  category: "Front",
  dates: ["2021-02-28", "2021-03-03"],
};

const developers = [developer0, developer1];

const setupDatabase = async () => {
  connect();
  await Developer.deleteMany();
  await Developer.create(developer0);
};

const turnOffDatabase = () => disconnect(mongoose);

module.exports = { developers, setupDatabase, turnOffDatabase };
