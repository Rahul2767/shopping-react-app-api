import jwt from "jsonwebtoken"

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 1 * 24 * 60 * 60 * 1000,
        domain : "https://shopping-react-app-qx7r.vercel.app"
    })
}

export default generateToken