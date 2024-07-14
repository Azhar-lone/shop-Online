//importing dependencies
import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import rateLimit from "express-rate-limit";

//importing Routers
import userRouter from "./Server/routes/userRoutes.js";
import productRouter from "./Server/routes/productRoutes.js";
import reviewRouter from "./Server/routes/reviewRoutes.js";
import generalRouter from "./Server/routes/generalRoutes.js";
import blogRouter from "./Server/routes/blogRouter.js";

//initializing express app
const app = express();

const port = process.env.PORT || 4000;
//listening
app.listen(port, () => console.log(`listening on http://localhost:${port}`));

// connecting to mongo database

mongoose
  .connect(process.env.MongoDB_URL, {
    appName: "shope-Online_DB",
  })
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log("error while connecting to db :", err.message);
  });

app.use(
  cors({
    credentials: true,
    origin: process.env.FrontEndUrl,
  })
);

//middlewares for parsing json,cookies and body data

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// rate limiter
// app.use(rateLimit())

//Routers
const baseUrl = process.env.BaseUrl;
app.use(baseUrl + "/users", userRouter);
app.use(baseUrl + "/products", productRouter);
app.use(baseUrl + "/general", generalRouter);
app.use(baseUrl + "/blogs", blogRouter);
app.use(baseUrl + "/reviews", reviewRouter);
//404 page
app.use((req, res) => {
  try {
    return res.status(404).json({
      msg: "Page Not found",
    });
  } catch (error) {
    res.status(500).json({
      msg: "internal server error",
    });
  }
});
