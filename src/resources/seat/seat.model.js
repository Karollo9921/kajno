const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {}

  Seat.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nameOfPlace: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Seat',
  })

  return Seat;
};