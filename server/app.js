const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 5000
const sequelize = require('./db')
const People = require('./db/models/people')

//create connection

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

sequelize.sync()
sequelize.sync({ force: true })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})