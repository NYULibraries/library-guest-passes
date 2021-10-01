const uuid = require('uuid');

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
      Guest.hasMany(models.Visit);
    }
  };
  Guest.init({
    id:{
      type: DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true
    },
    name: {
      type: DataTypes.UUID,
      allowNull:false
    },
    permission_status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull:false
    },
  }, {
      sequelize,
      modelName: 'Guest',
      timestamps: false,
      freezeTableName: true,
      underscored: true,
    });
  Guest.beforeCreate((guest, _ ) => {
    return guest.id = uuid();
  });
  return Guest;
};