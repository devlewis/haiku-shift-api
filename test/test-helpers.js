function makePhrasesArray() {
  return [
    {
      id: 1,
      text_p: "testing, test test test",
      syllables: 5,
      org_line: 1,
    },
    {
      id: 2,
      text_p: "TWOing, test test test, TEST test",
      syllables: 7,
      org_line: 2,
    },
    { id: 3, text_p: "THREEing, test test test", syllables: 5, org_line: 3 },
    {
      id: 4,
      text_p: "FOURing, test test test",
      syllables: 5,
      org_line: 1,
    },
    {
      id: 5,
      text_p: "FIVEing, test test test, TEST test",
      syllables: 7,
      org_line: 2,
    },
    { id: 6, text_p: "SIXing, test test test", syllables: 5, org_line: 3 },
    {
      id: 7,
      text_p: "SEVENing, test test test",
      syllables: 5,
      org_line: 1,
    },
    {
      id: 8,
      text_p: "EIGHTing, test test test, TEST test",
      syllables: 7,
      org_line: 2,
    },
    { id: 9, text_p: "NINEing, test test test", syllables: 5, org_line: 3 },
  ];
}

function makeHaikusArray() {
  return [
    { id: 1, date_created: new Date("2029-01-22T16:28:32.615Z"), penname: "" },
    {
      id: 2,
      date_created: new Date("2029-01-22T16:28:32.615Z"),
      penname: "Hairy Stylez",
    },
    {
      id: 3,
      date_created: new Date("2029-01-22T16:28:32.615Z"),
      penname: "EMMA!!!!!123",
    },
  ];
}

function makeHaiku_phrasesArray(phrases, haikus) {
  return [
    { haiku_id: haikus[0].id, phrase_id: phrases[0].id },
    { haiku_id: haikus[0].id, phrase_id: phrases[1].id },
    { haiku_id: haikus[0].id, phrase_id: phrases[2].id },
    { haiku_id: haikus[1].id, phrase_id: phrases[0].id },
    { haiku_id: haikus[1].id, phrase_id: phrases[1].id },
    { haiku_id: haikus[1].id, phrase_id: phrases[2].id },
    { haiku_id: haikus[2].id, phrase_id: phrases[0].id },
    { haiku_id: haikus[2].id, phrase_id: phrases[1].id },
    { haiku_id: haikus[2].id, phrase_id: phrases[2].id },
  ];
}

function seedPhrases(db, phrases) {
  return db
    .into("phrases")
    .insert(phrases)
    .then(() =>
      // update the auto sequence to stay in sync
      db.raw(`SELECT setval('phrases_id_seq', ?)`, [
        phrases[phrases.length - 1].id,
      ])
    );
}

function seedHaikuTables(db, phrases, haikus, haiku_phrases = []) {
  // use a transaction to group the queries and auto rollback on any failure
  return db.transaction(async (trx) => {
    await seedPhrases(trx, phrases);
    await trx.into("haikus").insert(haikus);
    // update the auto sequence to match the forced id values
    await trx.raw(`SELECT setval('haikus_id_seq', ?)`, [
      haikus[haikus.length - 1].id,
    ]);
    // only insert haiku_phrases if there are some, also update the sequence counter
    if (haiku_phrases.length) {
      await trx.into("haiku_phrases").insert(haiku_phrases);
    }
  });
}

function cleanTables(db) {
  return db.transaction((trx) =>
    trx
      .raw(
        `TRUNCATE
            haiku_phrases,
            haikus,
            phrases
          `
      )
      .then(() =>
        Promise.all([
          trx.raw(`ALTER SEQUENCE phrases_id_seq minvalue 0 START WITH 1`),
          trx.raw(`ALTER SEQUENCE haikus_id_seq minvalue 0 START WITH 1`),
          trx.raw(`SELECT setval('phrases_id_seq', 0)`),
          trx.raw(`SELECT setval('haikus_id_seq', 0)`),
        ])
      )
  );
}

function makeHaikuFixtures() {
  const testPhrases = makePhrasesArray();
  const testHaikus = makeHaikusArray();
  const testHaiku_phrases = makeHaiku_phrasesArray(testPhrases, testHaikus);
  return { testPhrases, testHaikus, testHaiku_phrases };
}

module.exports = {
  makeHaikuFixtures,
  makeHaiku_phrasesArray,
  makeHaikusArray,
  makePhrasesArray,
  cleanTables,
  seedHaikuTables,
  seedPhrases,
};
