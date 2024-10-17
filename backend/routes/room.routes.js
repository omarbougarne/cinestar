const express = require('express');
const router = express.Router();
const { getRooms, bookSeat, createRoom, updateRoom, deleteRoom } = require('../controllers/roomController');
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', getRooms);


router.post('/book-seat', bookSeat);


router.post('/', createRoom);


router.put('/:roomId', updateRoom);


router.delete('/:roomId', deleteRoom);

module.exports = router;
