const knex = require("knex");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe("App", () => {
  let db;

  const {
    testPhrases,
    testHaikus,
    testHaikuPhrases,
  } = helpers.makeHaikuFixtures();

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("cleanup", () => helpers.cleanTables(db));

  afterEach("cleanup", () => helpers.cleanTables(db));

  describe("GET /", () => {
    context("Given no haikus", () => {
      it("responds with 200 and an empty list", () => {
        return supertest(app).get("/api/").expect(200, []);
      });
    });

    context("Given there are haikus in the database", () => {
      before("insert haikus", () =>
        helpers.seedHaikuTables(db, testPhrases, testHaikus, testHaikuPhrases)
      );

      const expectedHaikus = testHaikus.map((haiku, i) => {
        return {
          id: testHaikus[i].id,
          date_created: new Date("2029-01-22T16:28:32.615Z").toDateString(),
          haiku: [null, null, null],
          penname: testHaikus[i].penname,
        };
      });

      it("responds with 201 and the haiku array", () => {
        return supertest(app).get("/api/").expect(200, expectedHaikus);
      });
    });
  });

  describe("POST /", () => {
    beforeEach("insert haikus", () =>
      helpers.seedHaikuTables(db, testPhrases, testHaikus, testHaikuPhrases)
    );
    context("bad request body", () => {
      it("responds with 404, error message", () => {
        const haiku = ["MISTAKE"];
        return supertest(app).post("/api/").send(haiku).expect(404, {
          error: `Bad request body; try again`,
        });
      });
    });

    context("happy path post", () => {
      it("responds with 201, happy message", () => {
        const haiku = {
          haiku: [
            "this is a haiku",
            "I made it today you know",
            "and it is for you",
            "YOURS TRULY",
          ],
        };
        const id = [4];
        return supertest(app)
          .post("/api/")
          .send(haiku)
          .expect(201, { message: `haiku with id ${id[0]} created` });
      });
    });
  });

  describe("GET /penname", () => {
    beforeEach("insert haikus", () =>
      helpers.seedHaikuTables(db, testPhrases, testHaikus, testHaikuPhrases)
    );
    context("Given penname doesn't exist", () => {
      it("responds with 400, error message", () => {
        const penname = { penname: "Popeye" };
        return supertest(app).get("/api/penname").send(penname).expect(400, {
          error: `No haikus found with that penname. Please try again`,
        });
      });
    });

    context("Given penname is not a string", () => {
      it("responds with 404, error message", () => {
        const penname = { penname: ["I'm an Array"] };
        return supertest(app).get("/api/penname").send(penname).expect(404, {
          error: `Bad penname; try again`,
        });
      });
    });

    context("Given penname is too long", () => {
      it("responds with 404, error message", () => {
        const penname = {
          penname: "I'm a fake penname I'm a fake penname I'm a fake penname",
        };
        return supertest(app).get("/api/penname").send(penname).expect(404, {
          error: `Bad penname; try again`,
        });
      });
    });

    context("Given penname is empty", () => {
      it("responds with 404, error message", () => {
        const penname = { penname: "" };
        return supertest(app).get("/api/penname").send(penname).expect(404, {
          error: `Bad penname; try again`,
        });
      });
    });
  });
});
