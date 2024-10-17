const express = require('express');
const router = express.Router();
const { getMovies, createMovie, updateMovie, deleteMovie } = require('../controllers/movieController');
const authMiddleware = require('../middleware/authMiddleware')
const upload = require('../middleware/upload');

router.get('/', getMovies);



router.post('/',authMiddleware,upload.single('image'), createMovie);
router.put('/:id',authMiddleware, updateMovie);


router.delete('/:id',authMiddleware, deleteMovie);

module.exports = router;
