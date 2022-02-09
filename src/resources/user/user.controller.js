const { Router } = require("express");
const UserService = require("./user.service");

class UserController {

  // UserService = new UserService();
  router = Router();
  
  constructor(path) {
    this.path = path;
    this.initialiseRoutes();
  }

  initialiseRoutes() {
    this.router.post(
      `${this.path}/register`,
      this.register
    );

    this.router.post(
      `${this.path}/login`,
      this.login
    );

    this.router.get(
      `${this.path}/users`,
      this.getUsers
    )
  };

  async register(req, res) {
    try {
      const { login, password } = req.body;
      const response = await UserService.register(
        login,
        password
      );

      res.status(201).json({ response });

    } catch (error) {
      res.status(400).json({ error });
    }
  }

  async login(req, res) {
    try {
      const { login, password } = req.body;

      const response = await UserService.login(
        login,
        password
      );

      return res.status(200).json({ response });

    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await UserService.getUsers();
      return res.status(200).json({ users });
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }
};

module.exports = UserController;