const { Sequelize, Model, Op } = require("sequelize");

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

    static async getMinimumDateOfScreening(idMovie) {
      return await this.min('dateOfScreening', {
        where: {
          [Op.and]: [
            { movie_id: idMovie }, 
            { alreadyStarted: false }
          ]
        }
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
    defaultScope: {
      where: {
        alreadyStarted: false
      }
    }
  });

  return Screening;
};