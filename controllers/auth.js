const User = require('../models/User');
const {StatusCodes} = require('http-status-codes')
const {BadRequestError,UnauthenticatedError} = require('../errors');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = async (req,res)=>{
    const {name,email,password} = req.body;
    const user = await User.create({name,email,password})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).send({
        user:{
            name:user.name,
            email:user.email
        },
        token
    })
}

const login = async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        throw new BadRequestError('Please provide email and password !')
    };
    const user = await User.findOne({
        email
    })
    if(!user){
        throw new UnauthenticatedError('Invalid credentials')
    }
    // compare password 
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('not correct password')
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
        user:{
            name:user.name
        },
        token
    })

}

module.exports = {
    register,
    login
}