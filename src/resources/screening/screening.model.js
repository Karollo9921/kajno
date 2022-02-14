const { Sequelize, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {

  class Screening extends Model {
    static associate(models) {
      this.belongsTo(models.movies, {
        foreignKey: 'movie_id'
      });
      this.belongsTo(models.rooms, {
        foreignKey: 'room_id'
      });
      this.hasMany(models.tickets, {
        foreignKey: 'screening_id',
        onDelete: 'CASCADE'
      });
      this.belongsToMany(models.users, {
        through: 'UserScreening'
      });
    };
  };

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