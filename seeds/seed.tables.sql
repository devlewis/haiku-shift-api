BEGIN;

TRUNCATE 
haiku_phrases,
haikus,
phrases
RESTART IDENTITY CASCADE; 

INSERT INTO phrases (text_p, syllables, org_line)
VALUES 
('into the green wood', 5, 1),
('bear would walk, always alone;', 7, 2),
('angry ants did smile.', 5, 3),
('laugh, purple penguin', 5, 1),
('what rainforest did commit', 7, 2),
('if elk encourage', 5, 3),
('Capybaras run', 5, 1),
('might an able forest take', 7, 2),
('orange lamb will walk.', 5, 3);

INSERT INTO haikus (penname)
VALUES ('Harry Stylez'),('Emmarock123'),('');

INSERT INTO haiku_phrases (haiku_id, phrase_id)
VALUES (1, 1), (1, 2), (1, 3), (2, 4), (2, 5), (2, 6), (3, 7), (3, 8), (3, 9);

COMMIT;
