const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "meapi.db");
const db = new sqlite3.Database(dbPath);

const schema = fs.readFileSync(path.join(__dirname, "../schema.sql"), "utf8");
const seed = fs.readFileSync(path.join(__dirname, "../seed.sql"), "utf8");

db.serialize(() => {
  db.exec(schema);
  db.exec(seed);
  console.log("✅ Database initialized with schema & seed data");
});

db.close();
