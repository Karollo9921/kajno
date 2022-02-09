const express = require("express");
const config = require("config");

class AppServer {
  constructor() {
    this.app = express();
    this.port = config.get("app.port");
    this.env = config.get("app.env");
  }
  /**
   * @author    Igor Dudek
   * @info      Server Listen
   */
  listen() {
    this.app.listen(this.port, () => {
      console.log(`========= ENV: ${this.env} ==========`);
      console.log(`🚀 Server listening hard on the port ${this.port}`);
    });
  }
}

module.exports = AppServer;
