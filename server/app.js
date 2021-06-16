const express = require('express');
const mysql = require('mysql');
const app = express();
const PORT = 5000;
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

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);