const { Router } = require("express");
const ClientCardService = require("./clientcard.service");

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
  * @author  Karol Kluba
  * @function  makeACard
  * @info    we create a new card for user 
  */
  async makeACard(req, res) {
    try {
      const login = req.session.user;
      const response = await ClientCardService.makeACard(login);
      res.status(201).json({ response });

    } catch (error) {
      res.status(400).json({ error });
    }
  }

  /**
  * @author  Karol Kluba
  * @function  getCard
  * @info    we display User's card 
  */
  async getCard(req, res) {
    try {
      const loggedUserLogin = req.session.user;
      const userId = req.params.id
      const card = await ClientCardService.getClientCard(userId, loggedUserLogin);
      return res.status(200).json({ card });
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }
};

module.exports = ClientCardController;