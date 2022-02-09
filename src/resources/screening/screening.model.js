const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Screening extends Model {}

  Screening.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    started: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
  }, {
    sequelize,
    modelName: 'Screening',
  })

  return Screening;
};