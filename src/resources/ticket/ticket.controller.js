const { Router } = require("express");
const TicketService = require("./ticket.service");

/**
* @author  Karol Kluba
* @module  TicketController
* @info    Routes Controller for Tickets
*/
class TicketController {

  router = Router();
  
  constructor(path) {
    this.path = path;
    this.initialiseRoutes();
  }

  initialiseRoutes() {
    this.router.post(
      `${this.path}/create`,
      this.createTicket
    );

    this.router.patch(
      `${this.path}/:id/buy`,
      this.buyATicket
    );

    this.router.get(
      `${this.path}/:id`,
      this.getTickets
    );
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
      let screeningId = req.params.id;
      let tickets = await TicketService.getTickets(screeningId);
      return res.status(200).json({ tickets });
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };
};

module.exports = TicketController;