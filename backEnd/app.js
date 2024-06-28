//importing dependencies
import express from "express"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import "dotenv/config"
import cors from "cors"
import redis from "redis"
import rateLimit from "express-rate-limit"
// import { Server } from "socket.io"



//importing Routers
import userRouter from "./Server/routes/userRoutes.js"
import productRouter from "./Server/routes/productRoutes.js"
// import reviewRouter from "./Server/routes/reviewRoutes"
import generalRouter from "./Server/routes/generalRoutes.js"
import blogRouter from "./Server/routes/blogRouter.js"


//initializing express app
const app = express()


const port = process.env.PORT || 4000
//listening
app.listen(port, () => console.log(`listening on http://localhost:${port}`))


cloudinary.config({
  cloud_name: process.env.Cloudinary_Cloud_Name, 
  api_key: process.env.Cloudinary_API_KEY, 
  api_secret: process.env.Cloudinary_API_SECRET
})

// connecting to mongo database

mongoose.connect(process.env.DB_URL).then(() => {
  console.log("connected to db")
}).catch((err) => {
  console.log("error while connecting to db :", err.message)
})

app.use(cors({
  credentials: true,
  origin: process.env.FrontEndUrl
}))


//middlewares for parsing json,cookies and body data

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

// rate limiter for 
app.use(rateLimit())

//Routers
const baseUrl = process.env.BaseUrl
app.use(baseUrl + "/users", userRouter)
app.use(baseUrl + "/products", productRouter)
app.use(baseUrl + "/general", generalRouter)
app.use(baseUrl + "/blogs", blogRouter)

//404 page
app.use((req, res) => {
  try {
    return res.status(404).json({
      msg: "Page Not found"
    })
  } catch (error) {
    res.status(500).json({
      msg: "internal server error",
    })
  }

})

// Socket setup
// const socket = new Server({
//   cors: {
//     credentials: true,
//     origin: process.env.FrontEndUrl
//   }
// })

// socket.on("connection", (socket) => {
//   console.log(socket)
// })





// connnecting to redis db
export let redisClient = redis.createClient({})
redisClient.on("error", err => console.log("redis Error :", err))
await redisClient.connect().then(() => console.log("connected to redis db"))