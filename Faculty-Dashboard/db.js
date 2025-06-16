const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",          
  password: "root123",          
  database: "result_system"  
});

db.connect(err => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to MySQL database.");
});

module.exports = db;
