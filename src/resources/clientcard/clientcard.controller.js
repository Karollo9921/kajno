const { Router } = require("express");
const ClientCardService = require("./clientcard.service");

const HttpException = require("../../utils/exceptions/exceptions");

/**
* @author  Karol Kluba
* @module  ClientCardController
* @info    Routes Controller for User's Cards
*/
class ClientCardController {

  router = Router();
  
  constructor(path) {
    this.path = path;
    this.initialiseRoutes();
  }

  initialiseRoutes() {
    this.router.post(
      `${this.path}/create`,
      this.makeACard
    );

    this.router.get(
      `${this.path}/:id`,
      this.getCard
    )
  };
  /**
  * @author        Karol Kluba
  * @returns       Promise<>
  * @description   CREATE Card for User
  */
  async makeACard(
    req, 
    res, 
    next
  ) {
    try {
      const login = req.session.user;
      const response = await ClientCardService.makeACard(login);

      return res.status(201).json({ response });
    } catch (error) {
      next(new HttpException(400, 'Cannot make a Card'));
    }
  }

  /**
  * @author        Karol Kluba
  * @returns       Promise<>
  * @description   GET Card for User
  */
  async getCard(
    req, 
    res, 
    next
  ) {
    try {
      const loggedUserLogin = req.session.user;
      const userId = req.params.id
      const card = await ClientCardService.getClientCard(userId, loggedUserLogin);
      return res.status(200).json({ card });
    } catch (error) {
      return next(new HttpException(404, error));
    }
  }
};

module.exports = ClientCardController;