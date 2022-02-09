const { Sequelize, DataTypes } = require("sequelize");
const config = require("config");

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
    console.log('connected..')
  })
  .catch(err => {
    console.log('Error'+ err)
  })

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("../resources/user/user.model")(sequelize, DataTypes);


db.sequelize.sync({ force: true })
  .then(() => {
    console.log('All models were synchronized successfully.');
  })
  .catch((error) => {
    console.log(`Error: ${error}`);
  })

module.exports = db;
