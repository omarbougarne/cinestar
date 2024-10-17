
const cloudinary = require('../config/cloudinary');
const { Movie, validateMovie } = require('../models/movieModel');
const mongoose = require('mongoose');


const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find(); 
        res.status(200).send(movies);
    } catch (err) {
        res.status(500).send({ message: 'Error fetching movies' });
    }
};




const createMovie = async (req, res) => {
    try {
        
        if (!req.file) {
            return res.status(400).json({ message: 'Image is required' });
        }

        
        const { title, genre, description, releaseDate, videoUrl } = req.body;

        
        const newMovie = {
            title,
            genre,
            description,
            releaseDate,
            videoUrl,
            imageUrl: req.file.path
        };

        
        const savedMovie = await Movie.create(newMovie);
        res.status(201).json(savedMovie);
    } catch (error) {
        res.status(500).json({ message: 'Error creating movie', error });
    }
};






const updateMovie = async (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).send({ message: 'Movie not found' });

        
        if (movie.createdBy.toString() !== req.user._id)
            return res.status(403).send({ message: 'Unauthorized to update this movie' });

        Object.assign(movie, req.body);  
        await movie.save();
        res.status(200).send(movie);
    } catch (err) {
        res.status(500).send({ message: 'Error updating movie' });
    }
};


const deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).send({ message: 'Movie not found' });

        
        if (movie.createdBy.toString() !== req.user._id)
            return res.status(403).send({ message: 'Unauthorized to delete this movie' });

        await movie.remove();
        res.status(200).send({ message: 'Movie deleted successfully' });
    } catch (err) {
        res.status(500).send({ message: 'Error deleting movie' });
    }
};

module.exports = {
    getMovies,
    createMovie,
    updateMovie,
    deleteMovie
};


