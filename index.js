const express = require("express");
const app = express();
const port = 3000;

// controllers
const {
  getAllMovies,
  getMoviesById,
  addNewMoviesCollection,
} = require("./controllers/movie.controller");

// middelware
app.use(express.json());

app.get("/movies", (req, res) => {
  let result = getAllMovies();
  if (!result) {
    res.status(404).send({ message: "No movies found" });
  } else {
    res.status(200).json(result);
  }
});

app.get("/movies/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let result = getMoviesById(id);
  if (!result) {
    res.status(404).send({ message: "Movie not found" });
  } else {
    res.status(200).json(result);
  }
});

// add new movies item
app.post("/movies/new", (req, res) => {
  let newMovie = req.body;
  let result = addNewMoviesCollection(newMovie);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).json({ message: "movie id not found" });
  }
});

module.exports = { app, port };
