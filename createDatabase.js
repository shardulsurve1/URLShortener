const dotenv = require("dotenv");

const mysql = require("mysql2");

dotenv.config({ path: "./config.env" });

const { DB_PASSWORD, DB_USERNAME, DB_DATABASE, DB_HOST } = process.env;

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USERNAME,
  password: DB_PASSWORD,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }

  connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_DATABASE}`, (error) => {
    if (error) {
      console.error("Error creating database:", error);
    } else {
      console.log(`Database '${DB_DATABASE}' created successfully.`);
    }
    connection.end();
  });
});
