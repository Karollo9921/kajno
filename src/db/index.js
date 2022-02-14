const { Sequelize, DataTypes } = require("sequelize");
const config = require("config");

const fs = require('fs');
const path = require('path');

const sequelize = new Sequelize(
  config.get("dbConfig.database"),
  config.get("dbConfig.username"),
  config.get("dbConfig.password"), {
    host: config.get("dbConfig.host"),
    dialect: config.get("dbConfig.dialect")
  }
);


const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

let folders = fs.readdirSync(path.join(__dirname, '/../resources'));
folders.forEach((folder) => {
  fs.readdirSync(path.join(__dirname, `/../resources/${folder}`))
    .filter((file) => {
      return file.slice(-8) === "model.js";
    })
    .forEach((file) => {
      const model = require(path.join(__dirname, `/../resources/${folder}`, file))(sequelize, DataTypes);
      db[model.tableName.toLowerCase()] = model;
    });
});

db.sequelize.sync({ force: true })
  .then(() => {
    console.log('All models were synchronized successfully.');
  })
  .catch((error) => {
    console.log(`Error: ${error}`);
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;