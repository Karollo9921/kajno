const express = require("express");
const config = require("config");

class AppServer {
  constructor(controllers) {
    this.controllers = controllers;

    this.express = express();
    this.port = config.get("app.port");
    this.env = config.get("app.env");
    this.express.use(express.json());

    this.#initialiseControlles();

  }
  /**
   * @author    Igor Dudek
   * @info      Server Listen
   */

  #initialiseControlles() {
    this.controllers.forEach((controller) => {
      this.express.use('/api', controller.router);
    });
  };

  listen() {
    this.express.listen(this.port, () => {
      console.log(`========= ENV: ${this.env} ==========`);
      console.log(`🚀 Server listening hard on the port ${this.port}`);
    });
  }
}

module.exports = AppServer;
