import { Server } from "socket.io";
import { createServer } from "http";

const PORT = 3003;
const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "*", // Allow all origins (change for production)
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"], // Ensure fallback support
});

io.on("connection", (socket) => {
  console.log(`✅ New client connected: ${socket.id}`);

  socket.on("sendMessage", (message) => {
    console.log(`📩 Message received from ${socket.id}:`, message);

    // Ensure message structure is correct
    const newMessage = {
      text: message.text,
      userId: socket.id,
      timestamp: new Date().toISOString()
    };

    // Emit to ALL clients, including sender
    io.emit("receiveMessage", newMessage);
});


  // Handle client disconnection
  socket.on("disconnect", () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
  });

  // Handle reconnection attempts
  socket.on("reconnect_attempt", (attemptNumber) => {
    console.log(`🔄 Reconnection attempt #${attemptNumber} for ${socket.id}`);
  });

  socket.on("reconnect", (attemptNumber) => {
    console.log(`🔄 Client ${socket.id} reconnected after ${attemptNumber} attempts`);
  });

  // Handle socket errors
  socket.on("error", (error) => {
    console.error(`⚠️ Socket error (${socket.id}):`, error);
  });
});

// Handle server-level connection errors
io.engine.on("connection_error", (err) => {
  console.error("🚨 Connection error:", err.message, err.req, err.code);
});

// Start server on all network interfaces
httpServer.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Socket.IO server running on port ${PORT}`);
});
