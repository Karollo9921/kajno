const { Sequelize, DataTypes } = require("sequelize");
const config = require("config");

const sequelize = new Sequelize(
  config.get("dbConfig.database"),
  config.get("dbConfig.username"),
  config.get("dbConfig.password"), {
    host: config.get("dbConfig.host"),
    dialect: config.get("dbConfig.dialect")
  }
);

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
db.tickets = require("../resources/ticket/ticket.model")(sequelize, DataTypes);
db.rooms = require("../resources/room/room.model")(sequelize, DataTypes);
db.clientcards = require("../resources/clientcard/clientcard.model")(sequelize, DataTypes);

db.sequelize.sync({ force: true })
  .then(() => {
    console.log('All models were synchronized successfully.');
  })
  .catch((error) => {
    console.log(`Error: ${error}`);
  })


// %%%%%%%%%%%%%%%%%%%%%%%
// ONE to MANY Association
// %%%%%%%%%%%%%%%%%%%%%%%

// MOVIE - SCREENING RELATION
db.movies.hasMany(db.screenings, {
  foreignKey: 'movie_id',
  onDelete: 'CASCADE'
});

db.screenings.belongsTo(db.movies, {
  foreignKey: 'movie_id'
});

// ROOM - SCREENING RELATION
db.rooms.hasMany(db.screenings, {
  foreignKey: 'room_id',
  onDelete: 'CASCADE'
});

db.screenings.belongsTo(db.rooms, {
  foreignKey: 'room_id'
});

// USER - TICKET RELATION
db.users.hasMany(db.tickets, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

db.tickets.belongsTo(db.users, {
  foreignKey: 'user_id'
});

// TICKET - SCREENING RELATION
db.screenings.hasMany(db.tickets, {
  foreignKey: 'screening_id',
  onDelete: 'CASCADE'
});

db.tickets.belongsTo(db.screenings, {
  foreignKey: 'screening_id'
});


// %%%%%%%%%%%%%%%%%%%%%%%%
// MANY to MANY Association
// %%%%%%%%%%%%%%%%%%%%%%%%

// USER - SCREENING RELATION
db.users.belongsToMany(db.screenings, { through: 'UserScreening' });
db.screenings.belongsToMany(db.users, { through: 'UserScreening' });


// %%%%%%%%%%%%%%%%%%%%%%%%
// ONE to ONE Association
// %%%%%%%%%%%%%%%%%%%%%%%%

// USER - CLIENTCARD RELATION
db.users.hasOne(db.clientcards, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

db.clientcards.belongsTo(db.users, {
  foreignKey: 'card_id',
  onDelete: 'CASCADE'
});


// %%%%%%%%%%%%%%%%%%
// EXPORT DB VARIABLE
// %%%%%%%%%%%%%%%%%%
module.exports = db;