const User = require('../models/user');
const CustomError = require('../utils/customError');

exports.createUser = async(req, res, next) => {
    
    const { email, password } = req.body;

    if(!email || !password){
        next(new CustomError('Email and Password are required!', 400));
    }

    // check from db if email is present
    const isEmail = await User.find({email});

    if(isEmail){
        next(new CustomError('Already a user Please Login', 400));
    }

    const user = await User.create({
        email, password
    });

    user.save();

    res.status(200).json({message: 'User created successfully', user})
}