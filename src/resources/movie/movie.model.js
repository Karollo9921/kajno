const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {}

  Movie.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    theClosestDateOfTheScreening: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    yearOfRelease: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Movie',
  })

  return Movie;
};