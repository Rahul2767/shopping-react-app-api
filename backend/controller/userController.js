import asyncHandler from 'express-async-handler'
import User from '../models/userModels.js'
import generateToken from '../utils/generateToken.js'

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(401)
        throw new Error('Invalid username or password')
    }
})

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(400)
        throw new Error('User already exist')
    }
    const user = await User.create({
        name,
        email,
        password,
    })
    if (user) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const createOrder = asyncHandler(async (req, res) => {
    const { orderedBy, productId, productTitle, productPrice } = req.body
    const userExist = await User.findOne({ email: orderedBy })
    if (userExist) {
        userExist.orders.push({ productId, productTitle, productPrice })
        await userExist.save()
        res.status(200).json({
            message: 'order created successfully'
        })
    }
    else {
        res.status(404).json({
            message: 'no user found'
        })
    }

})

const getOrders = asyncHandler(async (req, res) => {
    const { orderedBy } = req.body
    const userExist = await User.findOne({ email: orderedBy })
    if (userExist) {
        res.status(200).json(userExist.orders)
    }
    else res.status(200).json({
        message : 'You have no orders'
    })
})

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({
        message: 'User logged out'
    })
})

const getUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: 'Get user profile'
    })
})

const updateUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: 'Update user profile'
    })
})


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    createOrder,
    getOrders
}