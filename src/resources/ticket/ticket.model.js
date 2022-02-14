const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    static associate(models) {
      this.belongsTo(models.users, {
        foreignKey: 'user_id'
      });
      this.belongsTo(models.screenings, {
        foreignKey: 'screening_id'
      });
    };
  };

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