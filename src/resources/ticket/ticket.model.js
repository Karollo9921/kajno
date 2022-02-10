const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {}

  Ticket.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    place: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Ticket',
  })

  return Ticket;
};