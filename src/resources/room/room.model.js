const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Room extends Model {}

  Room.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Room',
  })

  return Room;
};