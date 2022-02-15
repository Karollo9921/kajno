const bcrypt = require("bcryptjs");
const { sequelize } = require('../../db/index');

const db = require("../../db/index");
const UserModel = db.users;

class UserService {
  /**
  * @author        Karol Kluba
  * @returns       Promise<UserModel>
  * @description   Create User handler - DRY
  */
  static async #registerHandler(
    { login, password }, 
    t
  ) {
    try {
      // checking if User exists
      const user = await UserModel.findAll({ where: { login: login } });
      if (user.length > 0) {
        throw new Error('User already exists!');
      } else {
        return await UserModel.create({ 
          login: login, 
          password: password,
          boughtTickets: []
        }, { transacion: t });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
  /**
  * @author        Karol Kluba
  * @returns       Promise<string>
  * @description   Create User
  */
  static async register(
    login,
    password
  ) {
    return await sequelize.transaction(async (t) => {
      const userData = await this.#registerHandler({ login, password }, t);

      return { message: 'Created!', user: userData };
    });
  };

  /**
  * @author        Karol Kluba
  * @returns       Promise<string>
  * @description   Login User
  */
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
      
      // checking if password is valid
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
  /**
  * @author        Karol Kluba
  * @returns       Promise<UserModel.login[]>
  * @description   GET Users Logins
  */
  static async getUsers() {
    try {
      return await UserModel.findAll({
        attributes: ['login']
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

module.exports = UserService;