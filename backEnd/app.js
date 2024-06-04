//importing dependencies
import express from "express"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import "dotenv/config"
import cors from "cors"

//importing Routers
import userRouter from "./Server/routes/userRoutes.js"
import productRouter from "./Server/routes/productRoutes.js"
// import reviewRouter from "./Server/routes/reviewRoutes"
import generalRouter from "./Server/routes/generalRoutes.js"

//initializing express app
const app = express()
const port = process.env.PORT || 4000
//listening
app.listen(port, () => console.log(`listening on http://localhost:${port}`))

// connecting to database
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



//Routers
const baseUrl = process.env.BaseUrl
app.use(baseUrl + "/users", userRouter)
app.use(baseUrl + "/products", productRouter)
app.use(baseUrl + "/general", generalRouter)

// app.use("/reviews", reviewRouter)

//404 page
app.use((req, res) => {
  try {
    return res.status(404).json({
      msg: "Page Not found"
    })
  } catch (error) {
    res.status(500).json({
      msg: "internal server error",
      error: error//development Only
    })
  }

})




