'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Affiliate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Affiliate.hasMany(models.Visit);
    };
  };
  Affiliate.init({
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
    permission_status: {
      type: DataTypes.BOOLEAN,
      allowNull:false
    },
  }, {
      sequelize,
      modelName: 'Affiliate',
      timestamps: false,
      freezeTableName: true,
    });
  return Affiliate;
};