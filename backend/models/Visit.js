'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Visit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Visit.belongsTo(models.Guest);
      Visit.belongsTo(models.Affiliate);
    }
  };
  Visit.init({
    id:{
      type: DataTypes.INTEGER,
      autoIncrement:true,
      allowNull:false,
      primaryKey:true
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
      modelName: 'Visit',
      timestamps: false,
      freezeTableName: true,
    });
  return Visit;
};