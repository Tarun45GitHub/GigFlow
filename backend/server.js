import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import dotenv from 'dotenv'
import connectDB from './src/config/db.js'


dotenv.config({
})
connectDB() //for database connect;

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", (userId) => {
    socket.join(userId); // 🔑 user-specific room
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
