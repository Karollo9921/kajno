const { Router } = require("express");
const RoomService = require("./room.service");

const HttpException = require("../../utils/exceptions/exceptions");

/**
* @author  Karol Kluba
* @module  RoomController
* @info    Routes Controller for Rooms Table
*/
class RoomController {

  router = Router();
  
  constructor(path) {
    this.path = path;
    this.initialiseRoutes();
  }

  initialiseRoutes() {
    this.router.post(
      `${this.path}/create`,
      this.createRoom
    );

    this.router.get(
      `${this.path}`,
      this.getRooms
    )
  };
  /**
  * @author        Karol Kluba
  * @returns       Promise<>
  * @description   CREATE Room
  */
  async createRoom(
    req, 
    res,
    next
  ) {
    try {
      const { name, numOfRows, numOfColumns, number } = req.body;
      const response = await RoomService.createRoom(
        name,
        numOfRows,
        numOfColumns,
        number
      );

      res.status(201).json({ response });
    } catch (error) {
      next(new HttpException(400, error.message));
    }
  }
  /**
  * @author        Karol Kluba
  * @returns       Promise<>
  * @description   GET Rooms
  */
  async getRooms(
    req, 
    res,
    next
  ) {
    try {
      const rooms = await RoomService.getRooms();

      res.status(200).json({ rooms });
    } catch (error) {
      next(new HttpException(404, error.message));
    }
  }
};

module.exports = RoomController;