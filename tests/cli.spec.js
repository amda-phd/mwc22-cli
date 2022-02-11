const path = require("path");
const { spawnSync } = require("child_process");

const { description, name } = require("@pack");
const Developer = require("Models/developer");
const { developers, setupDatabase } = require("Fix/db");

const appFilePath = path.join(__dirname, "../bin/index.js");

beforeEach(setupDatabase);

describe("When invoqued", () => {
  describe("Without any options", () => {
    it("Displays help", () => {
      const app = spawnSync("node", [appFilePath]);
      expect(app.output.toString()).toContain(description);
      expect(app.output.toString()).toContain(name);
    });
  });

  describe("With an unexpected option", () => {
    it("Throws a helpful error", () => {
      const app = spawnSync("node", [appFilePath, "-bla"]);
      expect(app.stdout.toString()).toBeFalsy();
      expect(app.stderr.toString()).toContain("unknown option");
    });
  });
});

describe("addDeveloper", () => {
  const command = "addDeveloper";

  describe("With all the expected options", () => {
    it.only("Adds the new developer to the database", async () => {
      const { name, email, phone, category, dates } = developers[1];

      let developer = await Developer.findOne({ email });
      expect(developer).toBeNull();

      const app = spawnSync("node", [
        appFilePath,
        command,
        "-n",
        name,
        "-e",
        email,
        "-p",
        phone,
        "-c",
        category,
        "-d",
        dates,
      ]);
      expect(app.status).toBe(1);

      developer = await Developer.findOne({ email });
      expect(developer).not.toBeNull();
    });
  });

  describe("Without dates", () => {
    it("Adds the new developer assuming that they're attending to the whole event", async () => {});
  });

  describe("With missing argument", () => {
    it("Throws a helpful error and doesn't add a new developer", async () => {});
  });

  describe("With invalid", () => {
    describe("Name", () => {
      it("Explains the problem and doesn't add the developer", () => {});
    });

    describe("Email", () => {
      it("Explains the problem and doesn't add the developer", () => {});
    });

    describe("Telephone number", () => {
      it("Explains the problem and doesn't add the developer", () => {});
    });

    describe("Category", () => {
      it("Explains the problem and doesn't add the developer", () => {});
    });

    describe("Dates", () => {
      it("Explains the problem and doesn't add the developer", () => {});
    });
  });

  describe("With duplicated email", () => {
    it("Explains the problem and doesn't add the developer", () => {});
  });
});
