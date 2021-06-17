'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    id:{
      type: DataTypes.INTEGER,
      autoIncrement:true,
      allowNull:false,
      primaryKey:true
    },
    name: {
      type: DataTypes.STRING,
    },
    guest: {
      type: DataTypes.STRING,
    },
    initials: {
      type: DataTypes.STRING,
    },
    restrictions: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    idtype: {
      type: DataTypes.STRING,
    },
    cardissue: {
      type: DataTypes.DATE,
    },
    cardexp: {
      type: DataTypes.DATE,
    },
    userStatus: {
      type: DataTypes.STRING,
    },
    loginCount: {
      type: DataTypes.TINYINT,
    },
    notes: {
      type: DataTypes.STRING,
    },
  }, {
      sequelize,
      modelName: 'User',
      timestamps: false,
    });
  return User;
};