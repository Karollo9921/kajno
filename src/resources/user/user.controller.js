const { Router } = require("express");
const UserService = require("./user.service");

const HttpException = require("../../utils/exceptions/exceptions");


// validation
const validate = require("./user.validation");
const validationMiddleware = require("../../middlewares/validation.middleware");

/**
* @author  Karol Kluba
* @module  UserController
* @info    Routes Controller for User's registration/login
*/
class UserController {

  router = Router();
  
  constructor(path) {
    this.path = path;
    this.initialiseRoutes();
  }

  initialiseRoutes() {
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(validate.register),
      this.register
    );

    this.router.post(
      `${this.path}/login`,
      validationMiddleware(validate.login),
      this.login
    );

    this.router.get(
      `${this.path}/users`,
      this.getUsers
    )
  };

  async register(
    req, 
    res, 
    next
  ) {
    try {
      const { login, password } = req.body;
      const response = await UserService.register(
        login,
        password
      );

      res.status(201).json({ response });
    } catch (error) {
      next(new HttpException(400, error.message));
    }
  }

  async login(
    req, 
    res,
    next
  ) {
    try {
      const { login, password } = req.body;

      const response = await UserService.login(
        login,
        password
      );

      req.session.user = login;
      console.log(req.session.user);

      return res.status(200).json({ response });

    } catch (error) {
      next(new HttpException(400, error.message));
    }
  };

  async getUsers(
    req, 
    res,
    next
  ) {
    try {
      const users = await UserService.getUsers();
      return res.status(200).json({ users });
    } catch (error) {
      return next(new HttpException(404, error.message));
    }
  }
};

module.exports = UserController;