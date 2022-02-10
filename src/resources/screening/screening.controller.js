const { Router } = require("express");
const ScreeningService = require("./screening.service");

class ScreeningController {

  router = Router();
  
  constructor(path) {
    this.path = path;
    this.initialiseRoutes();
  }

  initialiseRoutes() {
    this.router.post(
      `${this.path}/screenings/create`,
      this.createScreening
    );

    this.router.get(
      `${this.path}/screenings`,
      this.getScreenings
    )
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
};

module.exports = ScreeningController;