//importing dependencies
import express from "express"
import cookieParser from "cookie-parser"
import sqlite3 from "sqlite3"
import "dotenv/config"

//importing Routers
import { userRouter, productRouter, reviewRouter } from "./Server/Routes/exportRouters.js"

//initializing express app
const app = express()
const port = process.env.PORT || 4000
//listening
app.listen(port, () => console.log(`listening on http://localhost:${port}`))

// initializing sqlite3 database



//middlewares for parsing json,cookies and body data
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

//Routers
app.use("/user/", userRouter)
app.use("/product/", productRouter)
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




