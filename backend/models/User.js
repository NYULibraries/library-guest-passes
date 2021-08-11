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
      allowNull:false
    },
    initials: {
      type: DataTypes.STRING,
      allowNull:false
    },
    restrictions: {
      type: DataTypes.STRING,
      allowNull:false
    },
    status: {
      type: DataTypes.STRING,
      allowNull:false
    },
    idtype: {
      type: DataTypes.STRING,
      allowNull:false
    },
    cardissue: {
      type: DataTypes.DATE,
      allowNull:false
    },
    cardexp: {
      type: DataTypes.DATE,
      allowNull:false
    },
    userStatus: {
      type: DataTypes.STRING,
      allowNull:false,
      defaultValue: 1
    },
    loginCount: {
      type: DataTypes.TINYINT,
      allowNull:false,
      defaultValue: 1
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