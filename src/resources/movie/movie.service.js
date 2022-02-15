const db = require("../../db/index");
const { sequelize } = require("../../db/index");
const { Op } = require("sequelize");

const MovieModel = db.movies;

class MovieService {
  /**
  * @author        Karol Kluba
  * @returns       Promise<MovieModel>
  * @description   CREATE Movie - Handler - DRY
  */
  static async createMovieHandler(
    {
      title,
      yearOfRelease
    },
    t
  ) {
    try {
      const movie = await MovieModel.findAll({
        where: {
          [Op.and]: [{ title: title }, { yearOfRelease: yearOfRelease }]
        }
      });
      
      // checking if the Movie which we try to CREATE already exists, if yes, we throw an error, in other case we CREATE
      if (movie.length > 0) {
        throw new Error('Movie already exists!');
      } else {

        const newMovie = await MovieModel.create({ 
          title: title, 
          theClosestDateOfTheScreening: null,
          yearOfRelease: yearOfRelease
        }, { transaction: t });

        await newMovie.save();

        return newMovie;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
  /**
  * @author        Karol Kluba
  * @returns       Promise<string>
  * @description   CREATE Movie
  */
  static async createMovie(
    title,
    yearOfRelease
  ) {
    return await sequelize.transaction(async (t) => {
      const newMovie = await this.createMovieHandler({
        title,
        yearOfRelease
      }, t);
      
      return { 
        message: 'Created!',
        movie: newMovie
      };
    });
  };
  /**
  * @author        Karol Kluba
  * @returns       Promise<MovieModel[]>
  * @description   GET Movies
  */
  static async getMovies() {
    try {
      return await MovieModel.findAll();
    } catch (error) {
      throw new Error(error.message);
    };
  };
  /**
  * @author        Karol Kluba
  * @returns       Promise<MovieModel>
  * @description   GET Movie
  */
  static async getMovie(idMovie) {
    try {
      return await MovieModel.findOne({ where: { id: idMovie } });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

module.exports = MovieService;