const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  role: { type: String, enum: ['subscribed', 'basic'], default: 'subscribed' },  
  
},
{
    timestamps: true
});


const validateUser = (user, isUpdate = false) => {
    const schema = Joi.object({
        firstName: Joi.string().min(3).max(50).required(),
        lastName: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().required(),
        password: isUpdate ? Joi.string().optional() : Joi.string().min(5).required()
    });
    return schema.validate(user);
};


userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id, role: this.role }, process.env.JWT_SECRET);
};

module.exports = mongoose.model('User', userSchema);
module.exports.validateUser = validateUser;















//   favoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],  