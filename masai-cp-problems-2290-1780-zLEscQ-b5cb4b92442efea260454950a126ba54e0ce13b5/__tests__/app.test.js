const request = require("supertest");
const fs = require("fs");
const app = require("../index");

const { auth } = require("../middlewares/auth.middleware");
const { addID } = require("../middlewares/addID.middleware");

global.score = 1;
beforeAll(() => {
  fs.writeFileSync("./logs.txt", "");
});

beforeEach(() => {
  fs.writeFileSync(
    "db.json",
    JSON.stringify({
      heroes: [
        {
          id: 1,
          name: "IronMan",
          powers: ["robot", "money"],
          health: 33,
          villains: [
            {
              name: "Mandarin",
              health: 50,
            },
          ],
        },
        {
          id: 2,
          name: "Batman",
          powers: ["intelligence", "money"],
          health: 60,
          villains: [
            {
              name: "Redhood",
              health: 65,
            },
          ],
        },
        {
          id: 3,
          name: "Spider-Man",
          powers: ["intelligence"],
          health: 40,
          villains: [
            {
              name: "Dr. Octavio",
              health: 76,
            },
          ],
        },
        {
          id: 4,
          name: "Thor",
          powers: ["god", "magic"],
          health: 77,
          villains: [
            {
              name: "Hela",
              health: 87,
            },
          ],
        },
        {
          id: 5,
          name: "Dr. Strange",
          powers: ["magic"],
          health: 86,
          villains: [
            {
              name: "Dormamu",
              health: 100,
            },
          ],
        },
      ],
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Express Super Team CRUD", () => {
  it("should able to post the data and send the appropriate response on hitting at POST '/add/hero' ", async () => {
    const hero = {
      name: "Captain Marvel",
      powers: ["superhuman strength", "energy projection", "flight"],
      health: 95,
      villains: [
        {
          name: "Yon-Rog",
          health: 60,
        },
        {
          name: "Supreme Intelligence",
          health: 80,
        },
      ],
    };

    const response = await request(app)
      .post("/add/hero")
      .set("Content-Type", "application/json")
      .send(hero);

    expect(response.body).toStrictEqual([
      {
        health: 33,
        id: 1,
        name: "IronMan",
        powers: ["robot", "money"],
        villains: [{ health: 50, name: "Mandarin" }],
      },
      {
        health: 60,
        id: 2,
        name: "Batman",
        powers: ["intelligence", "money"],
        villains: [{ health: 65, name: "Redhood" }],
      },
      {
        health: 40,
        id: 3,
        name: "Spider-Man",
        powers: ["intelligence"],
        villains: [{ health: 76, name: "Dr. Octavio" }],
      },
      {
        health: 77,
        id: 4,
        name: "Thor",
        powers: ["god", "magic"],
        villains: [{ health: 87, name: "Hela" }],
      },
      {
        health: 86,
        id: 5,
        name: "Dr. Strange",
        powers: ["magic"],
        villains: [{ health: 100, name: "Dormamu" }],
      },
      {
        health: 95,
        id: 6,
        name: "Captain Marvel",
        powers: ["superhuman strength", "energy projection", "flight"],
        villains: [
          { health: 60, name: "Yon-Rog" },
          { health: 80, name: "Supreme Intelligence" },
        ],
      },
    ]);

    global.score += 1;
  });

  it("should able to get the data and send the appropriate response on hitting at GET '/heroes' ", async () => {
    const response = await request(app).get("/heroes");

    expect(response.body).toStrictEqual([
      {
        id: 1,
        name: "IronMan",
        powers: ["robot", "money"],
        health: 33,
        villains: [
          {
            name: "Mandarin",
            health: 50,
          },
        ],
      },
      {
        id: 2,
        name: "Batman",
        powers: ["intelligence", "money"],
        health: 60,
        villains: [
          {
            name: "Redhood",
            health: 65,
          },
        ],
      },
      {
        id: 3,
        name: "Spider-Man",
        powers: ["intelligence"],
        health: 40,
        villains: [
          {
            name: "Dr. Octavio",
            health: 76,
          },
        ],
      },
      {
        id: 4,
        name: "Thor",
        powers: ["god", "magic"],
        health: 77,
        villains: [
          {
            name: "Hela",
            health: 87,
          },
        ],
      },
      {
        id: 5,
        name: "Dr. Strange",
        powers: ["magic"],
        health: 86,
        villains: [
          {
            name: "Dormamu",
            health: 100,
          },
        ],
      },
    ]);

    global.score += 0.5;
  });

  it("should be able to add villain for the hero PATCH '/update/villain/:hero_id' route", async () => {
    const response1 = await request(app)
      .patch("/update/villain/1")
      .query({ role: "admin", pass: "saveEarh" })
      .send({
        name: "Superman",
        health: 99,
      });

    expect(response1.body).toStrictEqual({ message: "Not Authorized" });

    const response2 = await request(app)
      .patch("/update/villain/4")
      .query({ role: "admin", pass: "saveEarth" })
      .send({
        name: "Superman",
        health: 99,
      });

    expect(response2.body).toStrictEqual({
      id: 4,
      name: "Thor",
      powers: ["god", "magic"],
      health: 77,
      villains: [
        {
          name: "Hela",
          health: 87,
        },
        {
          name: "Superman",
          health: 99,
        },
      ],
    });

    global.score += 1.5;
  });

  it("should be able to delete the hero DELETE '/delete/hero/:hero_id' route", async () => {
    const response1 = await request(app)
      .delete("/delete/hero/1")
      .query({ role: "admin", pass: "saveEarh" });

    expect(response1.body).toStrictEqual({ message: "Not Authorized" });

    const response2 = await request(app)
      .delete("/delete/hero/1")
      .query({ role: "admin", pass: "saveEarth" });

    expect(response2.body).toStrictEqual([
      {
        id: 2,
        name: "Batman",
        powers: ["intelligence", "money"],
        health: 60,
        villains: [
          {
            name: "Redhood",
            health: 65,
          },
        ],
      },
      {
        id: 3,
        name: "Spider-Man",
        powers: ["intelligence"],
        health: 40,
        villains: [
          {
            name: "Dr. Octavio",
            health: 76,
          },
        ],
      },
      {
        id: 4,
        name: "Thor",
        powers: ["god", "magic"],
        health: 77,
        villains: [
          {
            name: "Hela",
            health: 87,
          },
        ],
      },
      {
        id: 5,
        name: "Dr. Strange",
        powers: ["magic"],
        health: 86,
        villains: [
          {
            name: "Dormamu",
            health: 100,
          },
        ],
      },
    ]);

    global.score += 1.5;
  });

  it("'logger' middleware should be working fine", () => {
    const logs = fs.readFileSync("./logs.txt", "utf-8").split("\n");

    expect(logs[0]).toMatch(
      /^URL: \/add\/hero, Method: POST, Timestamp: [A-Za-z]{3} [A-Za-z]{3} [0-9]{2} [0-9]{4} [0-9]{2}:[0-9]{2}:[0-9]{2} GMT[+-][0-9]{4} \(.*\)$/
    );

    expect(logs[1]).toMatch(
      /^URL: \/heroes, Method: GET, Timestamp: [A-Za-z]{3} [A-Za-z]{3} [0-9]{2} [0-9]{4} [0-9]{2}:[0-9]{2}:[0-9]{2} GMT[+-][0-9]{4} ( \(.*\))?/
    );
    expect(logs[2]).toMatch(
      /^URL: \/update\/villain\/(\d+)\?role=admin&pass=saveEarh, Method: PATCH, Timestamp: [A-Za-z]{3} [A-Za-z]{3} [0-9]{2} [0-9]{4} [0-9]{2}:[0-9]{2}:[0-9]{2} GMT[+-][0-9]{4} \(.*\)$/
    );
    expect(logs[3]).toMatch(
      /^URL: \/update\/villain\/(\d+)\?role=admin&pass=saveEarth, Method: PATCH, Timestamp: [A-Za-z]{3} [A-Za-z]{3} [0-9]{2} [0-9]{4} [0-9]{2}:[0-9]{2}:[0-9]{2} GMT[+-][0-9]{4} \(.*\)$/
    );

    expect(logs[4]).toMatch(
      /^URL: \/delete\/hero\/(\d+)\?role=admin&pass=saveEarh, Method: DELETE, Timestamp: [A-Za-z]{3} [A-Za-z]{3} [0-9]{2} [0-9]{4} [0-9]{2}:[0-9]{2}:[0-9]{2} GMT[+-][0-9]{4} \(.*\)$/
    );
    expect(logs[5]).toMatch(
      /^URL: \/delete\/hero\/(\d+)\?role=admin&pass=saveEarth, Method: DELETE, Timestamp: [A-Za-z]{3} [A-Za-z]{3} [0-9]{2} [0-9]{4} [0-9]{2}:[0-9]{2}:[0-9]{2} GMT[+-][0-9]{4} \(.*\)$/
    );

    global.score += 0.5;
  });

  it("'auth' middleware should be working fine", () => {
    let req = {
      method: "",
      query: {},
    };

    let res = {
      send: jest.fn(),
    };

    let next = jest.fn();
    req.method = "PATCH";
    req.query = {
      role: "admin",
      pass: "saveEarth",
    };

    auth(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();

    jest.clearAllMocks();

    req.method = "PATCH";
    req.query = {
      role: "admin",
      pass: "saveErth",
    };

    auth(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.send).toHaveBeenCalled();

    jest.clearAllMocks();

    req.method = "DELETE";
    req.query = {
      role: "admin",
      pass: "saveErth",
    };

    auth(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.send).toHaveBeenCalled();

    jest.clearAllMocks();

    req.method = "PATCH";
    req.query = {
      role: "admin",
      pass: "saveEarth",
    };

    auth(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();

    global.score += 1;
  });

  it("'addID' middleware should be working fine", () => {
    let req = {
      body: {},
    };

    let res = {};

    let next = jest.fn();

    const mockData1 = {
      heroes: [
        {
          id: 1,
          name: "IronMan",
          powers: ["robot", "money"],
          health: 33,
          villains: [
            {
              name: "Mandarin",
              health: 50,
            },
          ],
        },
        {
          id: 2,
          name: "Batman",
          powers: ["intelligence", "money"],
          health: 60,
          villains: [
            {
              name: "Redhood",
              health: 65,
            },
          ],
        },
        {
          id: 3,
          name: "Spider-Man",
          powers: ["intelligence"],
          health: 40,
          villains: [
            {
              name: "Dr. Octavio",
              health: 76,
            },
          ],
        },
        {
          id: 4,
          name: "Thor",
          powers: ["god", "magic"],
          health: 77,
          villains: [
            {
              name: "Hela",
              health: 87,
            },
          ],
        },
        {
          id: 5,
          name: "Dr. Strange",
          powers: ["magic"],
          health: 86,
          villains: [
            {
              name: "Dormamu",
              health: 100,
            },
          ],
        },
      ],
    };
    jest
      .spyOn(fs, "readFileSync")
      .mockReturnValueOnce(JSON.stringify(mockData1));

    addID(req, res, next);

    expect(req.body.id).toBeDefined();
    expect(req.body.id).toBe(6);
    expect(next).toHaveBeenCalled();
    expect(fs.readFileSync).toHaveBeenCalledWith("./db.json", "utf-8");

    const mockData2 = {
      heroes: [
        {
          id: 1,
          name: "IronMan",
          powers: ["robot", "money"],
          health: 33,
          villains: [
            {
              name: "Mandarin",
              health: 50,
            },
          ],
        },
        {
          id: 2,
          name: "Batman",
          powers: ["intelligence", "money"],
          health: 60,
          villains: [
            {
              name: "Redhood",
              health: 65,
            },
          ],
        },
        {
          id: 3,
          name: "Spider-Man",
          powers: ["intelligence"],
          health: 40,
          villains: [
            {
              name: "Dr. Octavio",
              health: 76,
            },
          ],
        },
        {
          id: 4,
          name: "Thor",
          powers: ["god", "magic"],
          health: 77,
          villains: [
            {
              name: "Hela",
              health: 87,
            },
          ],
        },
        {
          id: 5,
          name: "Dr. Strange",
          powers: ["magic"],
          health: 86,
          villains: [
            {
              name: "Dormamu",
              health: 100,
            },
          ],
        },
        {
          id: 6,
          name: "Dr. Doom",
          powers: ["magic"],
          health: 86,
          villains: [
            {
              name: "Dormamu",
              health: 100,
            },
          ],
        },
      ],
    };

    jest
      .spyOn(fs, "readFileSync")
      .mockReturnValueOnce(JSON.stringify(mockData2));

    addID(req, res, next);

    expect(req.body.id).toBeDefined();
    expect(req.body.id).toBe(7);
    expect(next).toHaveBeenCalled();
    expect(fs.readFileSync).toHaveBeenCalledWith("./db.json", "utf-8");

    global.score += 1;
  });
});

afterAll((done) => {
  done();
  console.log("Final Score is", global.score);
});
