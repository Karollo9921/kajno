const { Sequelize, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {

  class Screening extends Model {}

  Screening.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    dateOfScreening: {
      type: DataTypes.DATE,
      allowNull: false
    },
    alreadyStarted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    places: {
      type: Sequelize.JSON,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Screening',
  });

  return Screening;
};