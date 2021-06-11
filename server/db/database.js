const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'db',
  dialect: 'mysql',
  user: 'root',
  password: 'test'
});

sequelize.authenticate()
  .then(() => {
    console.log('connected to the db')
  });