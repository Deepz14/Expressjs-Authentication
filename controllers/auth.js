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

    try {
        const user = await User.create({email, password});
        res.status(200).json({status: 'success', message: 'User created successfully', user});
        
    } catch (error) {
        return next(new CustomError(error.message, 400));
    }
}

exports.login = async(req, res, next) => {

    const { email, password } = req.body;

    if(!email || !password){
        return next(new CustomError('Email and Password are required!', 400));
    }

    const user = await User.findOne({email}).select('+password');

    if(!user) return next(new CustomError('Unauthorized: unable to find your account Please try again with valid credentials or Signup', 401));

    // compare password
    const checkPwd = await user.comparePassword(password);

    if(!checkPwd) return next(new CustomError('Email or Password is incorrect', 400));

    res.status(200).json({status: 'success', message: 'login successfully', user});
}