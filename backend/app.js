import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


import authRoutes from "./src/routes/authRoute.js";
import gigRoutes from "./src/routes/gigRoute.js";
import bidRoutes from "./src/routes/bidRoute.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
;
// CORS (frontend → backend)
app.use(
  cors({
     origin:process.env.frontend_URl, // Vite frontend
    credentials: true,
  })
);



app.use("/api/auth", authRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/bids", bidRoutes);



app.get("/", (req, res) => {
  res.json({ message: "GigFlow API running 🚀" });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

export default app;
