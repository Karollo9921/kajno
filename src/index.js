// import constrollers
const UserController = require('./resources/user/user.controller');
const RoomController = require('./resources/room/room.controller');
const MovieController = require('./resources/movie/movie.controller');
const ScreeningController = require('./resources/screening/screening.controller');
const TicketController = require('./resources/ticket/ticket.controller');
const ClientCardController = require('./resources/clientcard/clientcard.controller');

/**
 * @author  Igor Dudek
 * @module  AppServer
 * @info    A index file that contain your app entry point.
 *          Come on, baby, light my fire 🔥
 */
const AppServer = require("./app");

const server = new AppServer([ 
  new UserController(''),
  new RoomController('/rooms'),
  new MovieController('/movies'),
  new ScreeningController('/screenings'),
  new TicketController('/tickets'),
  new ClientCardController('/cards')
]);

server.listen();