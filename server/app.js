const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';
const routes = require('./routes');
const cors = require('cors');

const db = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'test'
});

db.connect((err) => {
  if(err) throw err;
  console.log('MySql Connected...');
});

app.use(express.json({type: "application/json"}));
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
  methods: "GET, POST, PUT"
}
app.use(cors(corsOptions));
app.use('/', routes);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
