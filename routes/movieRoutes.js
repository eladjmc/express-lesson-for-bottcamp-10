import express from 'express';
import {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
} from '../controllers/movieController.js';

const router = express.Router();

// Route to get all movies
router.get('/', getAllMovies);

// Route to get a single movie by ID
router.get('/:id', getMovieById);

// Route to create a new movie
router.post('/', createMovie);

// Route to update an existing movie
router.put('/:id', updateMovie);

// Route to delete a movie
router.delete('/:id', deleteMovie);

export default router;
