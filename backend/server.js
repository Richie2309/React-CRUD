import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
dotenv.config();
import { notFount, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
const port = process.env.PORT || 5000

import userRoutes from './routes/userRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

connectDB();

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cookieParser())

app.use('/api/users', userRoutes)
app.use('/api/admin', adminRoutes)

  
app.get('/', (req, res) => res.send('API is running'))
   
app.use(notFount)
app.use(errorHandler)

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`))