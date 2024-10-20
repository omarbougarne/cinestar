const bcrypt = require('bcrypt');
const { User, validateUser } = require('../models/userModel'); 
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    
    user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });

    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    
    await user.save();

    
    const token = user.generateAuthToken(); 

    
    res.header('Authorization', `Bearer ${token}`).send({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    });
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    
    const token = user.generateAuthToken(); 

    
    res.send({ token });
};

module.exports = {
    registerUser,
    loginUser
};
