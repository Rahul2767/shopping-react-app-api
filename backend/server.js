import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT || 5000
import userRoutes from './routes/userRoutes.js'
import { notfound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import cookieParser from 'cookie-parser'

connectDB()

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://fakeflipkart.onrender.com');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.json())
app.use(urlencoded({ extended: true }))

app.use(cookieParser())

app.use('/api/users', userRoutes)

app.get('*', (req, res) => {
    res.send('welcome to server')
})



app.use(notfound)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log('server is running on port ' + PORT)
})
