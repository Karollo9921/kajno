const { Router } = require("express");
const ClientCardService = require("./clientcard.service");

class ClientCardController {

  router = Router();
  
  constructor(path) {
    this.path = path;
    this.initialiseRoutes();
  }

  initialiseRoutes() {
    this.router.post(
      `${this.path}/card/create`,
      this.makeACard
    );

    this.router.get(
      `${this.path}/card/:id`,
      this.getCard
    )
  };

  async makeACard(req, res) {
    try {
      const login = req.session.user;
      const response = await ClientCardService.makeACard(login);
      res.status(201).json({ response });

    } catch (error) {
      res.status(400).json({ error });
    }
  }

  async getCard(req, res) {
    try {
      const userId = req.params.id
      const card = await ClientCardService.getClientCard(userId);
      return res.status(200).json({ card });
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }
};

module.exports = ClientCardController;