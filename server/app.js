const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';
const routes = require('./routes');

const db = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'test'
});

// // Connect
db.connect((err) => {
  if(err) throw err;
  console.log('MySql Connected...');
});

app.use(express.json())
app.use('/', routes);
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);