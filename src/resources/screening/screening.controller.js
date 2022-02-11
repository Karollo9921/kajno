const { Router } = require("express");
const ScreeningService = require("./screening.service");

const HttpException = require("../../utils/exceptions/exceptions");

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

  async createScreening(
    req, 
    res,
    next
  ) {
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
      next(new HttpException(400, error.message));
    }
  };

  async getScreenings(
    req, 
    res,
    next
  ) {
    try {
      const screenings = await ScreeningService.getScreenings();

      res.status(200).json({ screenings });
    } catch (error) {
      next(new HttpException(404, error.message));
    }
  };

  async setToAlreadyStarted(
    req, 
    res,
    next
  ) {
    try {
      let idScreening = req.params.id;
      let response = await ScreeningService.setToAlreadyStarted(idScreening);

      res.status(200).json({ response });
    } catch (error) {
      next(new HttpException(403, error.message));
    }
  };
};

module.exports = ScreeningController;