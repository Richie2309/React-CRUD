import jwt from 'jsonwebtoken'

export const generateUserToken = (res, userId) => {
    const token = jwt.sign({ userId ,role:"user"}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
    res.cookie('jwtuser', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 30 * 24 * 60 * 60 * 1000
    })
}
export const generateAdminToken = (res, userId) => {
    const token = jwt.sign({ userId ,role:"admin"}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
    res.cookie('jwtadmin', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 30 * 24 * 60 * 60 * 1000
    })
}

