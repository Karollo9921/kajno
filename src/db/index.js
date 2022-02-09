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
db.movies = require("../resources/movie/movie.model")(sequelize, DataTypes);
db.screenings = require("../resources/screening/screening.model")(sequelize, DataTypes);


db.sequelize.sync({ force: true })
  .then(() => {
    console.log('All models were synchronized successfully.');
  })
  .catch((error) => {
    console.log(`Error: ${error}`);
  })


// One to Many Relation
db.movies.hasMany(db.screenings, {
  foreignKey: 'movie_id',
  as: 'screening'
});

db.screenings.belongsTo(db.movies, {
  foreignKey: 'movie_id',
  as: 'movie'
});


module.exports = db;