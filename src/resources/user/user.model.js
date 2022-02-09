const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}

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
