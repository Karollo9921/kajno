const { Router } = require("express");
const UserService = require("./user.service");

class UserController {
  
  UserService = new UserService();
  router = Router();

  constructor(path) {
    this.path = path;


    this.#initialiseRoutes();
  }

  #initialiseRoutes() {
    this.router.post(
      `${this.path}/register`,
      this.#register
    );

    this.router.post(
      `${this.path}/login`,
      this.#login
    );

    this.router.get(
      `${this.path}/get-users`,
      this.#getUsers
    )
  };

  async #register(req, res) {
    try {
      const { login, password } = req.body;

      const response = await this.UserService.register(
        login,
        password
      );

      res.status(201).json({ response });

    } catch (error) {
      res.status(400).json({ error });
    }
  }

  async #login(req, res) {
    try {
      const { login, password } = req.body;

      const response = await this.UserService.login(
        login,
        password
      );

      res.status(200).json({ response });

    } catch (error) {
      res.status(400).json({ error });
    }
  }

  async #getUsers(req, res) {
    if (!req.user) {
      return next(new HttpException(404, 'No logged in user'));
    }

    res.status(200).send({ data: req.user });
  }
};

module.exports = UserController;