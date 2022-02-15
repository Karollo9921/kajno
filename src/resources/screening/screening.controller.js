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
  /**
  * @author        Karol Kluba
  * @returns       Promise<Response>
  * @description   CREATE Screening
  */
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

      return res.status(201).json({ response });
    } catch (error) {
      next(new HttpException(400, error.message));
    }
  };
  /**
  * @author        Karol Kluba
  * @returns       Promise<Response>
  * @description   GET Screenings
  */
  async getScreenings(
    req, 
    res,
    next
  ) {
    try {
      const screenings = await ScreeningService.getScreenings();

      return res.status(200).json({ screenings });
    } catch (error) {
      next(new HttpException(404, error.message));
    }
  };
  /**
  * @author        Karol Kluba
  * @returns       Promise<Response>
  * @description   PATCH Screenings's 'alreadyStarted' fieeld to true
  */
  async setToAlreadyStarted(
    req, 
    res,
    next
  ) {
    try {
      let idScreening = req.params.id;
      let response = await ScreeningService.setToAlreadyStarted(idScreening);

      return res.status(200).json({ response });
    } catch (error) {
      next(new HttpException(403, error.message));
    }
  };
};

module.exports = ScreeningController;