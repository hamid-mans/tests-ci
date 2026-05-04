const sqlite3 = require('sqlite3').verbose();

const DB_FILE = process.env.NODE_ENV === 'test'
  ? ':memory:'   // DB en mémoire pour tests
  : './database.sqlite';

const db = new sqlite3.Database(DB_FILE);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      content TEXT,
      userId INTEGER,
      FOREIGN KEY(userId) REFERENCES users(id)
    )
  `);
});

module.exports = db;

// test