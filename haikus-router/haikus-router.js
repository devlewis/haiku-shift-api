const express = require("express");
const HaikusService = require("./haikus-service");
const bodyParser = express.json();

const haikusRouter = express.Router();

const serializeHaiku = (haikuDB) => ({
  id: haikuDB.id,
  date_created: new Date(haikuDB.date_created).toString().slice(0, 15),
  haiku: [haikuDB.haiku[0], haikuDB.haiku[1], haikuDB.haiku[2]],
  penname: haikuDB.penname,
});

haikusRouter
  .route("/")
  .get((req, res) => {
    HaikusService.getAllHaikus(req.app.get("db"))
      .then((haikus) => {
        if (haikus.length === 0) {
          return res.status(200).json([]);
        }
        res.status(200).json(haikus.map(serializeHaiku));
      })
      .catch((error) => res.status(500).json({ error: "server error" }));
  })
  .post(bodyParser, (req, res, next) => {
    if (req.body.haiku < 4 || req.body.haiku > 4 || !req.body.haiku) {
      return res.status(404).json({
        error: `Bad request body; try again`,
      });
    }
    const { haiku } = req.body;

    const phrases = [
      { text_p: haiku[0], syllables: 5, org_line: 1 },
      { text_p: haiku[1], syllables: 7, org_line: 2 },
      { text_p: haiku[2], syllables: 5, org_line: 3 },
    ];
    const penname = haiku[3];

    return HaikusService.insertNewHaiku(req.app.get("db"), phrases, penname)
      .then((id) => {
        res.status(201).json({ message: `haiku with id ${id[0]} created` });
      })
      .catch(next);
  });

haikusRouter.route("/penname/:penname").get(bodyParser, (req, res) => {
  const letterNumber = /^[0-9a-zA-Z]+$/;
  if (
    req.params.penname.length === 0 ||
    req.params.penname.length > 20 ||
    !req.params.penname.match(letterNumber)
  ) {
    return res.status(404).json({
      error: `Bad penname; try again`,
    });
  }

  return HaikusService.getByPenname(req.app.get("db"), req.params.penname)
    .then((haikus) => {
      if (haikus == null || haikus.length === 0) {
        return res.status(400).json({
          error: `No haikus found with that penname. Please try again`,
        });
      }

      res.status(200).json(haikus.map(serializeHaiku));
    })
    .catch((error) => console.log(error));
});

module.exports = haikusRouter;
