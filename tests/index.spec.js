const path = require("path");
const { spawnSync } = require("child_process");

const appFilePath = path.join(__dirname, "../bin/index.js");

describe("When invoqued", () => {
  describe("Without any options", () => {
    it("Greets back", () => {
      const app = spawnSync("node", [appFilePath]);
      expect(app.stdout.toString().toLowerCase()).toContain("hello world");
    });
  });

  describe("With initial velocity", () => {
    describe("Correctly parsed", () => {
      describe("As complete name --initialVelocity", () => {
        it("Returns the provided value", () => {
          const input = "something";
          const app = spawnSync("node", [
            appFilePath,
            "--initialVelocity",
            input,
          ]);
          expect(app.stdout.toString()).toContain(input);
          expect(app.stderr.toString()).toBeFalsy();
        });
      });

      describe("As aliased -v0", () => {
        it("Returns the provided value", () => {
          const input = "something";
          const app = spawnSync("node", [appFilePath, "-v0", input]);
          expect(app.stdout.toString()).toContain(input);
        });
      });
    });

    describe("Without any value", () => {
      it("Throws a helpful error", () => {
        const app = spawnSync("node", [appFilePath, "-v0"]);
        expect(app.stdout.toString()).toBeFalsy();
        expect(app.stderr.toString()).toContain("argument missing");
      });
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
