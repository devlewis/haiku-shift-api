const HaikusService = {
  getAllHaikus(db) {
    console.log("inside service");
    return db
      .from("haikus")
      .select(
        "id",
        "date_created",
        db.raw(
          'ARRAY(SELECT (phrases.text_p) FROM phrases JOIN haiku_phrases ON phrases.id=haiku_phrases.phrase_id WHERE haiku_phrases.haiku_id = haikus.id ORDER BY phrases.org_line ASC) AS "haiku"'
        ),
        "penname"
      )
      .returning("*");
  },

  insertNewHaiku(db, phrases, penname) {
    console.log("service1", phrases);
    return db
      .from("phrases")
      .insert(phrases)
      .into("phrases")
      .then(() => {
        console.log("service2", phrases);
        return HaikusService.insertHaikuId(db, penname);
      });
  },

  insertHaikuId(db, penname) {
    console.log("penname", penname);
    return db
      .from("haikus")
      .insert({ penname: penname })
      .into("haikus")
      .returning("id")
      .then((id) => HaikusService.insertHpIds(db, id));
  },

  insertHpIds(db, id) {
    return db
      .from("phrases")
      .select(db.raw(`ARRAY(SELECT id FROM phrases ORDER BY id DESC LIMIT 3)`))
      .first()
      .then((ids) => {
        console.log(ids);
        return db
          .from("haiku_phrases")
          .insert([
            {
              haiku_id: id[0],
              phrase_id: ids["array"][2],
            },
            {
              haiku_id: id[0],
              phrase_id: ids["array"][1],
            },
            {
              haiku_id: id[0],
              phrase_id: ids["array"][0],
            },
          ])
          .into("haiku_phrases")
          .returning(id[0]);
      });
  },

  getByPenname(db, penname) {
    return HaikusService.getAllHaikus(db, penname).where(
      "haikus.penname",
      penname
    );
  },
};

module.exports = HaikusService;
