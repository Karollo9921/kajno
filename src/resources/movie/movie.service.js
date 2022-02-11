const db = require("../../db/index");
const { Op } = require("sequelize");

const MovieModel = db.movies;

class MovieService {

  static async createMovie(
    title,
    yearOfRelease
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
        });

        await newMovie.save();

        return { 
          message: 'Created!',
          movie: newMovie
        }
      }

    } catch (error) {
      throw new Error(error.message);
    }
  }

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
      return error
    }
  }
};

module.exports = MovieService;