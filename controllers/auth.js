const User = require('../models/user');
const CustomError = require('../utils/customError');

exports.createUser = async(req, res, next) => {

    const { email, password } = req.body;

    if(!email || !password){
        return next(new CustomError('Email and Password are required!', 400));
    }

    // check from db if email is present
    const isEmail = await User.findOne({email});
    if(isEmail){
       return next(new CustomError('Already a user please login', 400));
    }

    const user = await User.create({email, password});

    res.status(200).json({message: 'User created successfully', user});
}