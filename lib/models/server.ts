// server.ts (Node.js + Express + Socket.io backend)
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Adjust this for security in production
  },
});

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg); // Broadcast the message to all clients
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

// client.ts (React + TypeScript + Socket.io frontend)
