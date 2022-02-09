/**
 * @author  Igor Dudek
 * @module  AppServer
 * @info    A index file that contain your app entry point.
 *          Come on, baby, light my fire 🔥
 */
const AppServer = require("./app");
const server = new AppServer();
server.listen();
