const path = require("path");
const { spawnSync } = require("child_process");

const { description, name } = require("@pack");
const Developer = require("Models/developer");
const { developers, setupDatabase, turnOffDatabase } = require("Fix/db");

const appFilePath = path.join(__dirname, "../bin/index.js");

beforeEach(setupDatabase);
afterAll(turnOffDatabase);

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

// TODO: Tests for importJSON command
// TODO: Better output checks in tests
// TODO: Understand why files that are actually covered by the suit get 0% of coverage

describe("addDeveloper", () => {
  const command = "addDeveloper";
  const { name, email, phone, category, dates } = developers[1];

  describe("With all the expected options", () => {
    it("Adds the new developer to the database", async () => {
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
        dates.join(","),
      ]);
      expect(app.status).toBe(1);

      developer = await Developer.findOne({ email });
      expect(developer).not.toBeNull();
      expect(developer.dates).toHaveLength(developers[1].dates.length);
    });
  });

  describe("Without dates", () => {
    it("Adds the new developer assuming that they're attending to the whole event", async () => {
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
      ]);
      expect(app.status).toBe(1);

      developer = await Developer.findOne({ email });
      expect(developer).not.toBeNull();
      expect(developer.dates).toHaveLength(4);
    });
  });

  describe("With missing argument", () => {
    it("Throws a helpful error and doesn't add a new developer", async () => {
      const app = spawnSync("node", [
        appFilePath,
        command,
        "-e",
        email,
        "-p",
        phone,
        "-c",
        category,
      ]);

      expect(app.status).toBe(0);
      expect(app.stdout.toString()).toBe("");
      expect(app.stderr.toString()).toContain("Path `name` is required");
      const developer = await Developer.findOne({ email });
      expect(developer).toBeNull();
    });
  });

  describe("With invalid", () => {
    describe("Name", () => {
      it("Explains the problem and doesn't add the developer", async () => {
        const app = spawnSync("node", [
          appFilePath,
          command,
          "-n",
          "",
          "-e",
          email,
          "-p",
          phone,
          "-c",
          category,
        ]);

        expect(app.status).toBe(0);
        expect(app.stdout.toString()).toBe("");
        expect(app.stderr.toString()).toContain("Path `name` is required");
        const developer = await Developer.findOne({ email });
        expect(developer).toBeNull();
      });
    });

    describe("Email", () => {
      it("Explains the problem and doesn't add the developer", async () => {
        const prevNum = await Developer.countDocuments({});
        const app = spawnSync("node", [
          appFilePath,
          command,
          "-n",
          name,
          "-e",
          "not an email",
          "-p",
          phone,
          "-c",
          category,
        ]);

        expect(app.status).toBe(0);
        expect(app.stdout.toString()).toBe("");
        expect(app.stderr.toString()).toContain(
          "The email address isn't valid"
        );
        const postNum = await Developer.countDocuments({});
        expect(prevNum).toBe(postNum);
      });
    });

    describe("Telephone number", () => {
      it("Explains the problem and doesn't add the developer", async () => {
        const prevNum = await Developer.countDocuments({});
        const app = spawnSync("node", [
          appFilePath,
          command,
          "-n",
          name,
          "-e",
          email,
          "-p",
          "563",
          "-c",
          category,
        ]);

        expect(app.status).toBe(0);
        expect(app.stdout.toString()).toBe("");
        expect(app.stderr.toString()).toContain("The phone number isn't valid");
        const postNum = await Developer.countDocuments({});
        expect(prevNum).toBe(postNum);
      });
    });

    describe("Category", () => {
      it("Explains the problem and doesn't add the developer", async () => {
        const prevNum = await Developer.countDocuments({});
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
          "whatever",
        ]);

        expect(app.status).toBe(0);
        expect(app.stdout.toString()).toBe("");
        expect(app.stderr.toString()).toContain(
          "not a valid enum value for path `category`"
        );
        const postNum = await Developer.countDocuments({});
        expect(prevNum).toBe(postNum);
      });
    });

    describe("Dates", () => {
      it("Explains the problem and doesn't add the developer", async () => {
        const prevNum = await Developer.countDocuments({});
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
          "2021-03-09",
        ]);

        expect(app.status).toBe(0);
        expect(app.stdout.toString()).toBe("");

        const postNum = await Developer.countDocuments({});
        expect(prevNum).toBe(postNum);
      });
    });
  });

  describe("With duplicated email", () => {
    it("Explains the problem and doesn't add the developer", async () => {
      const preDeveloper = await Developer.findOne({
        email: developers[0].email,
      });
      const app = spawnSync("node", [
        appFilePath,
        command,
        "-n",
        name,
        "-e",
        developers[0].email,
        "-p",
        phone,
        "-c",
        category,
      ]);

      expect(app.status).toBe(0);
      expect(app.stdout.toString()).toBe("");
      expect(app.stderr.toString()).toContain("duplicate key");

      const postDeveloper = await Developer.findOne({
        email: developers[0].email,
      });
      expect(preDeveloper.toObject()).toEqual(postDeveloper.toObject());
    });
  });
});
