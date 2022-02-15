const db = require("../../db/index");
const { sequelize } = require("../../db/index");
const { Op } = require("sequelize");

const MovieModel = db.movies;

class MovieService {

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

  static async getMovies() {
    try {
      return await MovieModel.findAll();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getMovie(idMovie) {
    try {
      return await MovieModel.findOne({ where: { id: idMovie } });
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

module.exports = MovieService;