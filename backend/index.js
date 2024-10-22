import express from "express";
import dotenv from "dotenv";
import dataBaseConection from "./config/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import tweetRoute from "./routes/tweetRoute.js";
import cors from "cors";

dotenv.config({
  path: ".env",
});

dataBaseConection();

const app = express();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//frontend se data aata use middleware jha se request aati h vo batana hota h
const corsOption = {
  origin: 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOption));

//route use krenge - api
app.use("/api/v1/users", userRoute);
app.use("/api/v1/tweet", tweetRoute);

app.listen(process.env.PORT, () =>
  console.log(`Serer start ${process.env.PORT}`)
);
