const pgp = require("pg-promise");
const connectionString =
  "postgresql://postgres:iggycray1@localhost:5433/dvdrental";
const db = pgp(connectionString);

db.connect(err => {
  if (err) {
    console.error("Connection error", err.stack);
  } else {
    console.log("Connected to the database");
  }
});

module.exports = db;
