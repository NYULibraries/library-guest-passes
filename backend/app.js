const express = require("express");
const mysql = require("mysql2");
const app = express();

const DB_HOST = process.env.DB_HOST || "db";
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "test";

const db = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySql Connected...");
});

module.exports = {
  app, 
};