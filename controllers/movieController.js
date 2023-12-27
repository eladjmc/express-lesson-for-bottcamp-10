import { v4 as uuidv4 } from 'uuid';
import { readMoviesFromFile, writeMoviesToFile } from '../models/movieModel.js';
import STATUS_CODE from '../constants/statusCodes.js';



// @desc    Get all the movies
// @route   GET /api/v1/movies
// @access  Public
export const getAllMovies = async (req, res, next) => {
  try {
    const movies = readMoviesFromFile();
    res.send(movies);
  } catch (error) {
    next(error);
  }
};


// @desc    Get a single movie by id
// @route   GET /api/v1/movies/:id
// @access  Public
export const getMovieById = async (req, res, next) => {
  try {
    const movies = readMoviesFromFile();
    const movie = movies.find(m => m.id === req.params.id);
    if (!movie) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error('Movie not found');
    }
    res.send(movie);
  } catch (error) {
    next(error);
  }
};


// @desc    Create a new movie
// @route   POST /api/v1/movies
// @access  Public
export const createMovie = async (req, res, next) => {
  try {
    const { title, director, releaseYear, rating } = req.body;
    if (!title || !director || !releaseYear || !rating) {
      res.status(STATUS_CODE.BAD_REQUEST);
      throw new Error('All fields (title, director, releaseYear, rating) are required');
    }

    const movies = readMoviesFromFile();
    if (movies.some(m => m.title === title)) {
      res.status(STATUS_CODE.CONFLICT);
      throw new Error('A movie with the same title already exists');
    }

    const newMovie = { id: uuidv4(), title, director, releaseYear, rating };
    movies.push(newMovie);
    writeMoviesToFile(movies);
    res.status(STATUS_CODE.CREATED).json(newMovie);
  } catch (error) {
    next(error);
  }
};

// @desc    Edit a single movie by id
// @route   PUT /api/v1/movies/:id
// @access  Public
export const updateMovie = async (req, res, next) => {
  try {
    const { title, director, releaseYear, rating } = req.body;

    if (!title || !director || !releaseYear || !rating) {
      res.status(STATUS_CODE.BAD_REQUEST);
      throw new Error('All fields (title, director, releaseYear, rating) are required for update');
    }

    let movies = readMoviesFromFile();
    const index = movies.findIndex(m => m.id === req.params.id);
    if (index === -1) { // i need to make general constants file and add NONE_EXIST_INDEX = -1
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error('Movie not found');
    }
    const lastIndex = movies.findLastIndex(m => m.title === title);
    if(lastIndex != -1 && lastIndex != index){
      res.status(STATUS_CODE.BAD_REQUEST);
      throw new Error('Cannot edit movie, movie with such title already exist!');
    }

    const updatedMovie = { ...movies[index], title, director, releaseYear, rating };
    movies[index] = updatedMovie;
    writeMoviesToFile(movies);
    res.send(updatedMovie);
  } catch (error) {
    next(error);
  }
};


// @desc    Delete a movie from the data base
// @route   DELETE /api/v1/movies/:id
// @access  Public
export const deleteMovie = async (req, res, next) => {
  try {
    let movies = readMoviesFromFile();
    const newMoviesList = movies.filter(m => m.id !== req.params.id);

    if (newMoviesList.length === movies.length) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error('Movie not found');
    }

    writeMoviesToFile(newMoviesList);
    res.status(STATUS_CODE.NO_CONTENT).send(`Movie with the id of ${req.params.id} was deleted!`);
  } catch (error) {
    next(error);
  }
};
