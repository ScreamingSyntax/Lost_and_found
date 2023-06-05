const { createPool } = require("mysql2");

const pool = createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "lost_and_found"
});

// Attempt to get a connection from the pool
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }

  console.log("Database Connection Successfull");

  connection.release();
});

module.exports = pool;
