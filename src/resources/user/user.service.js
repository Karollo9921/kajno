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

      console.log(`User: ${user == false}`);

      if (user.length > 0) {
        return 'User already exists!';
      } else {
        const newUser = await UserModel.create({ 
          login: login, 
          password: password 
        });

        await newUser.save();

        return 'Created!'
      }

    } catch (error) {
      return error
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
        return 'Unable to find user with that login';
      };
  
      if (user[0].password === password) {
        return 'LoggedIn!';
      } else {
        return 'Password incorrect !';
      };
    } catch (error) {
      return error;
    }
  }

  static async getUsers() {
    try {
      return await UserModel.findAll({
        attributes: ['login']
      });
    } catch (error) {
      return error
    }
  }
};

module.exports = UserService;