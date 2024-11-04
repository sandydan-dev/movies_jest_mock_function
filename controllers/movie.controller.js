const movies = [
  { id: 1, title: "The Shawshank Redemption", director: "Frank Darabont" },
  { id: 2, title: "The Godfather", director: "Francis Ford Coppola" },
  { id: 3, title: "The Dark Knight", director: "Christopher Nolan" },
];

function getAllMovies() {
  return movies;
}

function getMoviesById(id) {
  return movies.find((movie) => movie.id === id);
}

function addNewMoviesCollection(movie) {
  let newMovie = { id: movies.length + 1, ...movie };
  movies.push(newMovie);
  return newMovie;
}

module.exports = {
  getAllMovies,
  getMoviesById,
  addNewMoviesCollection,
};
