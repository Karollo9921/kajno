const db = require("../../db/index");
const { Op } = require("sequelize");
const { sequelize } = require("../../db/index");

const ScreeningModel = db.screenings;
const MovieModel = db.movies;
const RoomModel = db.rooms;

ScreeningModel.MovieModel = ScreeningModel.belongsTo(MovieModel, { foreignKey: 'movie_id' });
ScreeningModel.RoomModel = ScreeningModel.belongsTo(RoomModel, { foreignKey: 'room_id' });

class ScreeningService {
  /**
  * @author        Karol Kluba
  * @returns       Promise<ScreeningModel>
  * @description   create screening Handler - DRY
  */
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
      // checking if the Movie for which we Creating Screening exists
      const movie = await MovieModel.findAll({
        where: {
          id: parseInt(idMovie)
        }
      });

      if (movie.length === 0) {
        throw new Error('Provided Movie does not exists!')
      };

      // checking if the Room for which we Creating Screening exists
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
        movie_id: idMovie,
        room_id: idRoom
      }, {
        include: [ MovieModel, RoomModel ], 
        transacion: t
      });

      await newScreening.save();

      // checking the closest date of Screening for the Movie
      let minDateOfScreening = await ScreeningModel.getMinimumDateOfScreening(idMovie);

      // updating closest screening date for Movie 
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
  /**
  * @author        Karol Kluba
  * @returns       Promise<string>
  * @description   Create Screening
  */
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
  /**
  * @author        Karol Kluba
  * @returns       Promise<string>
  * @description   UPDATE Screening's 'alreadyStarted' field to true - Handler - DRY
  */
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
  
      // checking the closest date of Screening for the Movie
      let minDateOfScreening = await ScreeningModel.getMinimumDateOfScreening(idMovie);

      // updating closest screening date for Movie 
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
  /**
  * @author        Karol Kluba
  * @returns       Promise<string>
  * @description   UPDATE Screening's 'alreadyStarted' to true
  */
  static async setToAlreadyStarted(idScreening) {
    return await sequelize.transaction(async (t) => {
      const message = await this.setToAlreadyStartedHandle({ idScreening }, t);

      return message;
    });
  };
  /**
  * @author        Karol Kluba
  * @returns       Promise<ScreeningModel[]>
  * @description   GET all Screenings
  */
  static async getScreenings() {
    try {
      return await ScreeningModel.findAll();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getScreening(idScreening) {
    try {
      return await ScreeningModel.scope({ method: ["getScreeningById", idScreening] }).findAll();
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

module.exports = ScreeningService;