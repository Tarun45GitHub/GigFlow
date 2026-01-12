import express from "express";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./src/config/db.js";

import authRoutes from "./src/routes/authRoute.js";
import gigRoutes from "./src/routes/gigRoute.js";
import bidRoutes from "./src/routes/bidRoute.js";

dotenv.config();
connectDB();
// console.log(process.env.PORT);

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

app.use("/api/auth", authRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/bids", bidRoutes);

app.listen(process.env.PORT||5000, () => console.log(`server running on ${process.env.PORT}`));
