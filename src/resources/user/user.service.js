const UserModel = require("../../db/index").users;

class UserService {
  async register(
    login,
    password
  ) {
    try {

      const user = await UserModel.findAll({
        where: {
          login: login
        }
      });

      if (user) {
        throw new Error('User already exists!');
      } else {
        const newUser = await UserModel.create({ 
          login: login, 
          password: password 
        });

        return 'Created!'
      }

    } catch (error) {
      throw new Error(error.message);
    }
  }

  async login(
    login,
    password
  ) {
    const user = await UserModel.findAll({
      where: {
        login: login
      }
    });

    if (!user) {
      throw new Error('Unable to find user with that email address');
    };

    if (user.password === password) {
      return 'LoggedIn!';
    } else {
      throw new Error('Password incorrect !');
    };
  }

  async getUsers() {
    return await UserModel.findAll({
      attributes: ['login']
    });
  }
};

module.exports = UserService;