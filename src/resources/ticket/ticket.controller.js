const { Router } = require("express");
const TicketService = require("./ticket.service");

class TicketController {

  router = Router();
  
  constructor(path) {
    this.path = path;
    this.initialiseRoutes();
  }

  initialiseRoutes() {
    this.router.post(
      `${this.path}/tickets/create`,
      this.createTicket
    );

    this.router.patch(
      `${this.path}/tickets/buy`,
      this.buyATicket
    );

    this.router.get(
      `${this.path}/tickets`,
      this.getTickets
    )
  };

  async createTicket(req, res) {
    try {
      const { price, place, idScreening } = req.body;
      const response = await TicketService.createTicket(
        price,
        place,
        idScreening      
      );

      res.status(201).json({ response });

    } catch (error) {
      res.status(400).json({ error });
    }
  };

  async buyATicket(req, res) {
    try {
      let { idTicket } = req.body;
      let login = req.session.user;

      const response = await TicketService.buyATicket(idTicket, login);

      res.status(200).json({ response });
    } catch (error) {
      res.status(400).json({ error });
    }
  };

  async getTickets(req, res) {
    try {
      const tickets = await TicketService.getTickets();
      return res.status(200).json({ tickets });
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };
};

module.exports = TicketController;