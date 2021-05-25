const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 5000

//create connection

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456789'
});

// Connect
db.connect((err) => {
  if(err) throw err;
  console.log('MySql Connected...');
});

// Create DB
// app.get('/createdb', (req, res) => {
//   let sql = 'CREATE DATABASE nodemysql';
//   db.query(sql, (err, result) => {
//       if(err) throw err;
//       console.log(result);
//       res.send('Database created...');
//   });
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})