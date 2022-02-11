const { Router } = require("express");
const ScreeningService = require("./screening.service");

/**
* @author  Karol Kluba
* @module  ScreeningController
* @info    Routes Controller for Screening Table
*/
class ScreeningController {

  router = Router();
  
  constructor(path) {
    this.path = path;
    this.initialiseRoutes();
  }

  initialiseRoutes() {
    this.router.post(
      `${this.path}/create`,
      this.createScreening
    );

    this.router.get(
      `${this.path}`,
      this.getScreenings
    );
    
    this.router.patch(
      `${this.path}/started/:id`,
      this.setToAlreadyStarted
    );

  };

  async createScreening(req, res) {
    try {
      const { dateOfScreening, idMovie, idRoom } = req.body;
      const response = await ScreeningService.createScreening(
        dateOfScreening,
        false,
        idMovie,
        idRoom
      );

      res.status(201).json({ response });

    } catch (error) {
      res.status(400).json({ error });
    }
  }

  async getScreenings(req, res) {
    try {
      const screenings = await ScreeningService.getScreenings();
      return res.status(200).json({ screenings });
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }

  async setToAlreadyStarted(req, res) {
    try {
      let idScreening = req.params.id;
      let response = await ScreeningService.setToAlreadyStarted(idScreening);
      return res.status(200).json({ response });
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };
};

module.exports = ScreeningController;