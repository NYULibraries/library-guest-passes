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
    user_id:{
      type: DataTypes.INTEGER,
      autoIncrement:true,
      allowNull:false,
      primaryKey:true
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    guest: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    initials: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    restrictions: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    idtype: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    cardissue: {
      type: DataTypes.DATETIME,
      unique: true,
      allowNull: false,
    },
    cardexp: {
      type: DataTypes.DATETIME,
      unique: true,
      allowNull: false,
    },
    userStatus: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    loginCount: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    notes: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  }, {
      sequelize,
      modelName: 'User',
    });
  return User;
};