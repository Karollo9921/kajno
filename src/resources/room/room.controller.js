const { Router } = require("express");
const RoomService = require("./room.service");

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

  async createRoom(req, res) {
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
      res.status(400).json({ error });
    }
  }

  async getRooms(req, res) {
    try {
      const rooms = await RoomService.getRooms();
      return res.status(200).json({ rooms });
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }
};

module.exports = RoomController;