import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT || 5000
import userRoutes from './routes/userRoutes.js'
import { notfound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

connectDB()

const app = express();
app.use(cors({
    credentials: true,
    origin: 'https://shopping-react-app-qx7r.vercel.app',
}))
app.use(express.json())
app.use(urlencoded({ extended: true }))

app.use(cookieParser())

app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
    res.send('welcome to server')
})



app.use(notfound)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log('server is running on port ' + PORT)
})
