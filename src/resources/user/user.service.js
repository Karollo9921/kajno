const bcrypt = require("bcryptjs");

const db = require("../../db/index");
const UserModel = db.users;

class UserService {

  static async register(
    login,
    password
  ) {
    try {

      const user = await UserModel.findAll({
        where: {
          login: login
        }
      });

      if (user.length > 0) {
        throw new Error('User already exists!');
      } else {
        const newUser = await UserModel.create({ 
          login: login, 
          password: password,
          boughtTickets: []
        });

        await newUser.save();

        return { 
          message: 'Created!',
          user: newUser
        }
      }

    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async login(
    login,
    password
  ) {
    try {
      const user = await UserModel.findAll({
        where: {
          login: login
        }
      });

      if (user.length === 0) {
        throw new Error('Unable to find user with that login');
      };
      
      let isPasswordCorrect = await bcrypt.compare(password, user[0].password)
      if (isPasswordCorrect) {
        return 'LoggedIn!';
      } else {
        throw new Error('Password incorrect !');
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getUsers() {
    try {
      return await UserModel.findAll({
        attributes: ['login']
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

module.exports = UserService;