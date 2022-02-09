const express = require("express");
const config = require("config");

class AppServer {
  constructor(controllers) {
    this.controllers = controllers;

    this.app = express();
    this.port = config.get("app.port");
    this.env = config.get("app.env");
    this.app.use(express.json());

    this.#initialiseControlles();
    this.#initialiseDatabaseConnection();

  }
  /**
   * @author    Igor Dudek
   * @info      Server Listen
   */

  #initialiseDatabaseConnection() {
    
  };

  #initialiseControlles() {

  };

  listen() {
    this.app.listen(this.port, () => {
      console.log(`========= ENV: ${this.env} ==========`);
      console.log(`🚀 Server listening hard on the port ${this.port}`);
    });
  }
}

module.exports = AppServer;
