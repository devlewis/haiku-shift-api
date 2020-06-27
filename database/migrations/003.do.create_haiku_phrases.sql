CREATE TABLE haiku_phrases (
    haiku_id INTEGER REFERENCES haikus(id),
    phrase_id INTEGER REFERENCES phrases(id)
);