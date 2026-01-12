CREATE TABLE IF NOT EXISTS profile (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  education TEXT,
  github TEXT,
  linkedin TEXT,
  portfolio TEXT
);

CREATE TABLE IF NOT EXISTS project (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  links TEXT,
  skill TEXT
);
