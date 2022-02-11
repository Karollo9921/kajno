const { Router } = require("express");
const MovieService = require("./movie.service");

const HttpException = require("../../utils/exceptions/exceptions");

/**
* @author  Karol Kluba
* @module  MovieController
* @info    Routes Controller for Movies Table
*/
class MovieController {

  router = Router();
  
  constructor(path) {
    this.path = path;
    this.initialiseRoutes();
  }

  initialiseRoutes() {
    this.router.post(
      `${this.path}/create`,
      this.createMovie
    );

    this.router.get(
      `${this.path}`,
      this.getMovies
    )

    this.router.get(
      `${this.path}/:id`,
      this.getMovie
    )
  };

  async createMovie(
    req, 
    res, 
    next
  ) {
    try {
      const { title, yearOfRelease } = req.body;
      const response = await MovieService.createMovie(
        title,
        yearOfRelease
      );

      res.status(201).json({ response });
    } catch (error) {
      next(new HttpException(400, 'Cannot create a Movie'));
    }
  }

  async getMovies(
    req, 
    res,
    next
  ) {
    try {
      const movies = await MovieService.getMovies();

      res.status(200).json({ movies });
    } catch (error) {
      next(new HttpException(404, error.message));
    }
  };

  async getMovie(
    req, 
    res,
    next
  ) {
    try {
      const id = req.params.id;
      const movie = await MovieService.getMovies(id);

      res.status(200).json({ movie });
    } catch (error) {
      next(new HttpException(404, error.message));
    }
  };
};

module.exports = MovieController;