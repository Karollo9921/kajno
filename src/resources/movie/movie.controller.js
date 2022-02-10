const { Router } = require("express");
const MovieService = require("./movie.service");

class MovieController {

  router = Router();
  
  constructor(path) {
    this.path = path;
    this.initialiseRoutes();
  }

  initialiseRoutes() {
    this.router.post(
      `${this.path}/movies/create`,
      this.createMovie
    );

    this.router.get(
      `${this.path}/movies`,
      this.getMovies
    )

    this.router.get(
      `${this.path}/movies/:id`,
      this.getMovie
    )
  };

  async createMovie(req, res) {
    try {
      const { title, yearOfRelease } = req.body;
      const response = await MovieService.createMovie(
        title,
        yearOfRelease
      );

      res.status(201).json({ response });

    } catch (error) {
      res.status(400).json({ error });
    }
  }

  async getMovies(req, res) {
    try {
      const movies = await MovieService.getMovies();
      return res.status(200).json({ movies });
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };

  async getMovie(req, res) {
    try {
      const id = req.params.id;
      const movie = await MovieService.getMovies(id);
      return res.status(200).json({ movie });
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };

};

module.exports = MovieController;