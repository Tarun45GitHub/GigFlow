import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import dotenv from 'dotenv'
import connectDB from './src/config/db.js'


dotenv.config({
})
connectDB() //for database connect;

const server = http.createServer(app);
const forntURL=process.env.frontend_URl
export const io = new Server(server, {
  cors: {
    origin:process.env.frontend_URl,
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
const port=process.env.PORT||5000;
server.listen(port, () => {
  console.log(`server running on ${port}`);
});
