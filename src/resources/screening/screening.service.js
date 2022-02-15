const db = require("../../db/index");
const { Op } = require("sequelize");
const { sequelize } = require("../../db/index");

const ScreeningModel = db.screenings;
const MovieModel = db.movies;
const RoomModel = db.rooms;

ScreeningModel.MovieModel = ScreeningModel.belongsTo(MovieModel, { foreignKey: 'movie_id' });
ScreeningModel.RoomModel = ScreeningModel.belongsTo(RoomModel, { foreignKey: 'room_id' });

class ScreeningService {

  static async createScreeningHandle(
    { 
      date,
      alreadyStarted,
      idMovie,
      idRoom
    },
    t
  ) {
    try {
      const movie = await MovieModel.findAll({
        where: {
          id: parseInt(idMovie)
        }
      });

      if (movie.length === 0) {
        throw new Error('Provided Movie does not exists!')
      };

      const room = await RoomModel.findAll({
        where: {
          id: parseInt(idRoom)
        }
      });

      if (room.length === 0) {
        throw new Error('Provided Room does not exists!')
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
        include: [ MovieModel, RoomModel ], 
        transacion: t
      });

      await newScreening.save();

      let minDateOfScreening = await ScreeningModel.min('dateOfScreening', {
        where: {
          [Op.and]: [
            { movie_id: idMovie }, 
            { alreadyStarted: false }
          ]
        }
      });

      await MovieModel.update({ theClosestDateOfTheScreening: minDateOfScreening }, {
        where: {
          id: idMovie
        }
      }, { transacion: t });

      return newScreening;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static async createScreening(
    date,
    alreadyStarted,
    idMovie,
    idRoom
  ) {
    return await sequelize.transaction(async (t) => {
      const screeningData = await this.createScreeningHandle({ 
        date,
        alreadyStarted,
        idMovie,
        idRoom
      }, t)

      return { message: 'Created!', user: screeningData };
    });
  };

  static async setToAlreadyStartedHandle(
    { idScreening },
    t
  ) {
    try {
      let screening = await ScreeningModel.findOne({
        where: {
          id: idScreening
        }
      });

      await ScreeningModel.update({ alreadyStarted: true }, {
        where: {
          id: idScreening
        }
      }, { transaction: t });
  
      let minDateOfScreening = await ScreeningModel.min('dateOfScreening', {
        where: {
          [Op.and]: [
            { movie_id: await screening.getDataValue('movie_id') }, 
            { alreadyStarted: false }
          ]
        }
      });

      await MovieModel.update({ theClosestDateOfTheScreening: minDateOfScreening }, {
        where: {
          id: await screening.getDataValue('movie_id')
        }
      }, { transaction: t });
  
      return { 
        message: 'Changed to Started!'
      };
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static async setToAlreadyStarted(idScreening) {
    return await sequelize.transaction(async (t) => {
      const message = await this.setToAlreadyStartedHandle({ idScreening }, t);

      return message;
    });
  };

  static async getScreenings() {
    try {
      return await ScreeningModel.findAll();
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

module.exports = ScreeningService;