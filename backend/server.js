import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import mealRouter from './routes/mealRoute.js'
import householdRouter from './routes/householdRoute.js'
import orderRouter from './routes/orderRoute.js'
import shoppingListRouter from './routes/shoppingListRoute.js'
import calendarRouter from './routes/calendarRoute.js'
import reviewRouter from './routes/reviewRoute.js'
import suggestionRouter from './routes/suggestionRoute.js'

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
app.use('/api/meal',mealRouter)
app.use('/api/household',householdRouter)
app.use('/api/order',orderRouter)
app.use('/api/shopping-list',shoppingListRouter)
app.use('/api/calendar',calendarRouter)
app.use('/api/review',reviewRouter)
app.use('/api/suggestion',suggestionRouter)


app.get('/', (req,res)=>{
    res.send("API is Working")
})

app.listen(port, ()=> console.log('Server started on PORT: ' + port))