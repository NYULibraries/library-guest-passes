const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 5000

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


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})