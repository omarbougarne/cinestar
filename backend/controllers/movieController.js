const { Movie, validateMovie } = require('../models/movieModel');
const mongoose = require('mongoose');


const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find().populate('createdBy', 'username'); 
        res.status(200).send(movies);
    } catch (err) {
        res.status(500).send({ message: 'Error fetching movies' });
    }
};




const createMovie = async (req, res) => {
    
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    
    const movie = new Movie({
        title: req.body.title,
        genre: req.body.genre,
        description: req.body.description,
        releaseDate: req.body.releaseDate,
        rating: req.body.rating,
        videoUrl: req.body.videoUrl,
        imageUrl: req.body.imageUrl,
        createdBy: req.user._id 
    });

    try {
        
        await movie.save();
        res.status(201).send(movie);
    } catch (err) {
        res.status(500).send('Server error');
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


