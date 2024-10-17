const Session = require('../models/sessionModel');
const { validateSession } = require('../validation/sessionValidation'); 


const createSession = async (req, res) => {
    const { error } = validateSession(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { movieId, roomId, startTime, endTime } = req.body;

    try {
        const session = new Session({
            movie: movieId,
            room: roomId,
            startTime,
            endTime,
            createdBy: req.user._id
        });

        await session.save();
        res.status(201).json(session);
    } catch (error) {
        res.status(500).send('Error creating session.');
    }
};

/////tododoooooooooooooooooo

module.exports = {
    createSession,
    
};
