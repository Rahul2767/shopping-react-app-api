import jwt from "jsonwebtoken"

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
    res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
    })
}

export default generateToken