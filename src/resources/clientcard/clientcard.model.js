const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ClientCard extends Model {}

  ClientCard.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'ClientCard',
  })

  return ClientCard;
};