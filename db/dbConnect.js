const mysql = require("mysql");
require("dotenv").config();

// Here to is use across multiple files. Used to make SQL queries to DB
const con = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  port: process.env.DBPORT,
  database: process.env.DBNAME,
  multipleStatements: true,
  connectionLimit: 50,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = con;
