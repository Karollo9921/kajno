const { Sequelize, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {
      this.hasMany(models.screenings, {
        foreignKey: 'movie_id',
        onDelete: 'RESTRICT'
      });
    };
  };

  Room.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    places: {
      type: Sequelize.JSON,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Room',
  })

  return Room;
};