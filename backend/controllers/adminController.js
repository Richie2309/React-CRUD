import asyncHandler from 'express-async-handler'
import { generateAdminToken } from '../utils/generateToken.js';
import User from '../models/userModel.js'
import dotenv from 'dotenv'
dotenv.config()
//@desc Auth admin/set token
//route POST /api/admin/auth
//@access Public
const adminCredentials = {
    adminEmail: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASSWORD
}

const authAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (email === adminCredentials.adminEmail && password === adminCredentials.adminPassword) {
        generateAdminToken(res, 'admin');
        res.status(201).json({
            email: adminCredentials.adminEmail
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

//@desc Logout admin
//@route POST /api/admin/logout
//@access Private (admin only)
const logoutAdmin = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({ message: 'Admin logged out' })
})

//@desc Get all users
//@route GET /api/admin/users
//@access Private (admin only)
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.status(200).json(users)
})

//@desc Create a new user
//@route POST /api/admin/users
//@access Private (admin only)
const createUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
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


//@desc Update user profile
//@route PUT /api/admin/users/:id
//@access Private (admin only)
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.profilePicture = req.body.profilePicture || user.profilePicture

        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            profilePicture: updatedUser.profilePicture
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

//@desc Delete user
//@route DELETE /api/admin/users/:id
//@access Private (admin only)
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        await User.deleteOne({ _id: user._id });
        res.json({ message: 'User removed' })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

export {
    authAdmin,
    logoutAdmin,
    getUsers,
    createUser,
    updateUser,
    deleteUser
}