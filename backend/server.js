import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'

// App Config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// Middlewares
app.use(express.json()) // any request will be passed as json
app.use(cors()) // access backend from any ip

// API Endpoints
app.use('/api/user',userRouter)


app.get('/', (req,res)=>{
    res.send("API is Working")
})

app.listen(port, ()=> console.log('Server started on PORT: ' + port))