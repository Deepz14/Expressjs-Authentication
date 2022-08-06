const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// create schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        validate: [validator.default.isEmail, "Please enter a valid Email"],
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        minlength: [6, "Password should be minimum 6 characters"],
        required: [true, "Password is required"]
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Encrypt password before save
userSchema.pre("save", async function(next){
    // Only run this method if password was modified (Not on other update function)
    if(!this.isModified('password')) return next();

    // Hash password with the strength of 10
    this.password = await bcrypt.hash(this.password, 10); 
})

// compare Password from the request body
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

// create and return JWT token
userSchema.methods.getJwtToken = async function(){
    return await jwt.sign(
        {id: this._id},
        process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRY    
    })
}

module.exports = mongoose.model('User', userSchema);