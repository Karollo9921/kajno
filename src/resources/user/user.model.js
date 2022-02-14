const { Sequelize, Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.tickets, {
        foreignKey: 'user_id',
        onDelete: 'RESTRICT'
      });
      this.belongsToMany(models.screenings, { 
        through: 'UserScreening' 
      });
      this.hasOne(models.clientcards, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      });
    };
  };

  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    login: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    boughtTickets: {
      type: Sequelize.JSON,
      allowNull: true,
      // get() {
      //   return this.getDataValue('boughtTickets').split(';')
      // },
      // set(val) {
      //   this.setDataValue('boughtTickets',val.join(';'));
      // },
    }
  }, {
    hooks: {
      beforeCreate: (async (user, options) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
      })
    },
    sequelize,
    modelName: 'User',
  })

  return User;
};
