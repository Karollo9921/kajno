const express = require("express");
const config = require("config");
const { Sequelize } = require("sequelize")

class AppServer {
  constructor(controllers) {
    this.controllers = controllers;

    this.app = express();
    this.port = config.get("app.port");
    this.env = config.get("app.env");

    this.#initialiseControlles();
    this.#initialiseDatabaseConnection();

  }
  /**
   * @author    Igor Dudek
   * @info      Server Listen
   */

  #initialiseDatabaseConnection() {
    const sequelize = new Sequelize(
      config.get("dbConfig.database"),
      config.get("dbConfig.username"),
      config.get("dbConfig.password"), {
        host: config.get("dbConfig.host"),
        dialect: config.get("dbConfig.dialect")
      }
    )

    sequelize.authenticate()
      .then(() => {
        console.log('Connected to MYSQL...');
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
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
