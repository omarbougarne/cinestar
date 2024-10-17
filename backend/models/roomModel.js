const mongoose = require('mongoose');


const seatSchema = new mongoose.Schema({
    seatNumber: { type: String, required: true }, 
    isBooked: { type: Boolean, default: false }   
});


const roomSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    seats: [seatSchema]  
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
