const db = require("../database/dbConfig.js");

const { insert } = require("./auth-model");

describe("users model", function() {
  describe("insert()", function() {
    beforeEach(async () => {
      await db("users").truncate();
    });

    it("should insert a user", async function() {
      // insert a user into the db
      await insert({ name: "users" });

      // check if it was inserted into the db
      const users = await db("users"); // read from db directly
      expect(users).toHaveLength(1); // at least we know one record was inserted
    });

    it("should insert the provided user", async function() {
      await insert({ name: "john" });
      await insert({ name: "amy" });

      const users = await db("users"); // read from db directly

      expect(users).toHaveLength(2); // both records are there
      expect(users[0].name).toBe("john"); // the first record is john
      expect(users[1].name).toBe("amy"); // the second record is amy
    });

    it("should return the inserted user", async function() {
      let user = await insert({ name: "john" });
      expect(user.name).toBe("amy");
      expect(user.id).toBeDefined(); // now I know it's coming from the db

      user = await insert({ name: "amy" });
      expect(user.name).toBe("amy");
      expect(user.id).toBeDefined();
    });
  });
});
