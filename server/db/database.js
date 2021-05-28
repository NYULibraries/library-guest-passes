const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'mysql',
  dialect: 'mysql',
  user: 'root',
  password: ''
});

sequelize.authenticate()
  .then(() => {
    console.log('connected to the db')
  })