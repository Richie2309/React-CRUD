import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
    let token = req.cookies.jwtuser

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            
            if (decoded.role === 'user') {

            req.user = await User.findById(decoded.userId).select('-password');
            next()
            }else{
                res.status(401)
                throw new Error('Not authorized, invalid token')

            }
        } catch (error) {
        }
    } else {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

const protectAdmin = asyncHandler(async (req, res, next) => {
    let token
    if (req.cookies.jwtadmin) {
        try {
            token = req.cookies.jwtadmin
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            if (decoded.role === 'admin') {
                next()
            } else {
                res.status(401)
                throw new Error('Not authorized as an admin')
            }
        } catch (error) {
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    } else {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

export { protect, protectAdmin }