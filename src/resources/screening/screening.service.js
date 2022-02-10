const db = require("../../db/index");
const ScreeningModel = db.screenings;
const MovieModel = db.movies;
const RoomModel = db.rooms;

ScreeningModel.MovieModel = ScreeningModel.belongsTo(MovieModel, { foreignKey: 'movie_id' });
ScreeningModel.RoomModel = ScreeningModel.belongsTo(RoomModel, { foreignKey: 'room_id' });

class ScreeningService {

  static async createScreening(
    date,
    alreadyStarted,
    idMovie,
    idRoom
  ) {
    try {

      const movie = await MovieModel.findAll({
        where: {
          id: parseInt(idMovie)
        }
      });

      if (movie.length === 0) {
        return 'Provided Movie does not exists!'
      };

      const room = await RoomModel.findAll({
        where: {
          id: parseInt(idRoom)
        }
      });

      if (room.length === 0) {
        return 'Provided Room does not exists!'
      };

      let places = room[0].getDataValue('places')
        .toString()
        .replace("[", "")
        .replace("]", "")
        .replace(/(['"])/g, "")
        .split(',')
        .map((place) => { return { place: place, avaliable: true } })
        
      const newScreening = await ScreeningModel.create({ 
        dateOfScreening: date, 
        alreadyStarted: alreadyStarted,
        places: places,
        movie_id: movie[0].getDataValue('id'),
        room_id: room[0].getDataValue('id')
      }, {
        include: [ MovieModel, RoomModel ]
      });

      await newScreening.save();

      return 'Created!'
      

    } catch (error) {
      return error
    }
  }

  static async getScreenings() {
    try {
      return await ScreeningModel.findAll();
    } catch (error) {
      return error
    }
  }
};

module.exports = ScreeningService;