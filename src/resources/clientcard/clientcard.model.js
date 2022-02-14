const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ClientCard extends Model {
    static associate(models) {
      this.belongsTo(models.users, {
        foreignKey: 'card_id',
        onDelete: 'CASCADE'
      });
    };
  };

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