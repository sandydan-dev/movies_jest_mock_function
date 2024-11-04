const {
  getAllMovies,
  getMoviesById,
  addNewMoviesCollection,
} = require("../controllers/movie.controller");
const { app } = require("../index");
const http = require("http");

// define mock function, test functions are working properly
jest.mock("../controllers/movie.controller.js", () => ({
  ...jest.requireActual("../controllers/movie.controller.js"),
  getAllMovies: jest.fn(),
  getMoviesById: jest.fn(),
  addNewMoviesCollection: jest.fn(),
}));

// define variable to connect with server
let server;

// befor all test start server

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

// after all test  stop server
afterAll((done) => {
  server.close(done);
});

// describe mock function

describe("movies mock function", () => {
  // test fetching all movies
  test("fetch all movie with mock function", () => {
    let mockMovies = [
      { id: 1, title: "The Shawshank Redemption", director: "Frank Darabont" },
      { id: 2, title: "The Godfather", director: "Francis Ford Coppola" },
      { id: 3, title: "The Dark Knight", director: "Christopher Nolan" },
    ];
    getAllMovies.mockReturnValue(mockMovies);
    let result = getAllMovies();
    // expect  result to be equal to mockMovie
    expect(result).toEqual(mockMovies);
    // check length of functon
    expect(result.length).toEqual(3);
    //  check type of function called
    expect(getAllMovies).toHaveBeenCalled();
  });

  // test function to get movie by id
  test("should return movies id", () => {
    let mockMovie = {
      id: 1,
      title: "The Shawshank Redemption",
      director: "Frank Darabont",
    };
    getMoviesById.mockReturnValue(mockMovie);
    let result = getMoviesById(mockMovie);
    expect(result).toEqual(mockMovie);
    expect(getMoviesById).toHaveBeenCalledWith(mockMovie);
  });

  // test should return undefined if movie id not found
  test("should return  undefined if movie id not found", () => {
    getMoviesById.mockReturnValue(undefined);
    let result = getMoviesById(123);
    expect(result).toBeUndefined();
    expect(getMoviesById).toHaveBeenCalledWith(123);
  });

  // test should add new movie item
  test("should add new movie item", () => {
    let mockMovie = {
      id: 4,
      title: "Inception",
      director: "Christopher Nolan",
    };
    addNewMoviesCollection.mockReturnValue(mockMovie);
    let result = addNewMoviesCollection(mockMovie);

    expect(result).toEqual(mockMovie);
    expect(addNewMoviesCollection).toHaveBeenCalledWith(mockMovie);
  });

  // test  should return error if movie id already exists
  test("should return error if movie id already exists", () => {
    let mockMovie = {
      id: 1,
      title: "The Shawshank Redemption",
      director: "Frank Darabont",
    };
    addNewMoviesCollection.mockReturnValue(
      new Error("Movie id already exists")
    );
    let result = addNewMoviesCollection(mockMovie);
    expect(result).toBeInstanceOf(Error);
    expect(addNewMoviesCollection).toHaveBeenCalledWith(mockMovie);
  });
});
