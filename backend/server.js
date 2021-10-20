const express = require("express");
const { app } = require("./app.js");
const routes = require("./routes");
const cors = require("cors");
const PORT = process.env.REACT_APP_PORT || 5000;
const HOST = process.env.REACT_APP_HOST || "0.0.0.0";

app.use(express.json({ type: "application/json" }));
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
  methods: "GET, POST, PUT, DELETE",
};
app.use(cors(corsOptions));
app.use("/", routes);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
