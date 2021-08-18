'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Guest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Guest.belongsTo(models.Visit, { foreignKey: "guest_id" });
    }
  };
  Guest.init({
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
      modelName: 'Guest',
      timestamps: false,
    });
  return Guest;
};