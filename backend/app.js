const express = require("express");
const mysql = require("mysql2");
const app = express();
const routes = require("./routes");
const cors = require("cors");

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

app.use(express.json({ type: "application/json" }));
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
  methods: "GET, POST, PUT, DELETE",
};
app.use(cors(corsOptions));
app.use("/", routes);

