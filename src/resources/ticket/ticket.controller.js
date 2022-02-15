const { Router } = require("express");
const TicketService = require("./ticket.service");

const HttpException = require("../../utils/exceptions/exceptions");

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
  /**
  * @author        Karol Kluba
  * @returns       Promise<>
  * @description   Create Ticket for Screening
  */
  async createTicket(
    req, 
    res,
    next
  ) {
    try {
      const { price, place, idScreening } = req.body;
      const response = await TicketService.createTicket(
        price,
        place,
        idScreening      
      );

      return res.status(201).json({ response });
    } catch (error) {
      next(new HttpException(400, error.message));
    }
  };
  /**
  * @author        Karol Kluba
  * @returns       Promise<>
  * @description   Buy a Ticket
  */
  async buyATicket(
    req, 
    res,
    next
  ) {
    try {
      let { idTicket } = req.body;
      let login = req.session.user;

      const response = await TicketService.buyATicket(idTicket, login);

      return res.status(200).json({ response });
    } catch (error) {
      next(new HttpException(403, error.message));
    }
  };
  /**
  * @author        Karol Kluba
  * @returns       Promise<>
  * @description   GET Tickets for Screening
  */
  async getTickets(req, res) {
    try {
      let screeningId = req.params.id;
      let tickets = await TicketService.getTickets(screeningId);

      return res.status(200).json({ tickets });
    } catch (error) {
      next(new HttpException(404, error.message));
    }
  };
};

module.exports = TicketController;