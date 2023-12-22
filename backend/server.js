import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT || 5000
import userRoutes from './routes/userRoutes.js'
import { notfound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import cookieParser from 'cookie-parser'
import data from './data.json' with {type: 'json'};

connectDB()

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.json())
app.use(urlencoded({ extended: true }))

app.use(cookieParser())

app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
    res.send('welcome to server')
})

app.get('/products', (req, res) => {
    res.json(data)
})

app.use(notfound)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log('server is running on port ' + PORT)
})
