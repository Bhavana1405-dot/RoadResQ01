"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = require("socket.io");
var http_1 = require("http");
var httpServer = (0, http_1.createServer)();
var io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    },
    transports: ["websocket", "polling"],
    pingTimeout: 60000,
    pingInterval: 25000,
    connectTimeout: 60000
});
io.on("connection", function (socket) {
    console.log("New client connected:", socket.id);
    // Handle incoming messages
    socket.on("sendMessage", function (message) {
        console.log("Message received:", message);
        // Broadcast message to all clients, including sender
        io.emit("receiveMessage", message);
    });
    // Add error handling for socket
    socket.on("error", function (error) {
        console.error("Socket error (".concat(socket.id, "):"), error);
    });
    socket.on("disconnect", function (reason) {
        console.log("Client disconnected (".concat(socket.id, "). Reason: ").concat(reason));
    });
    socket.on("reconnect", function (attemptNumber) {
        console.log("Client reconnected (".concat(socket.id, ") after ").concat(attemptNumber, " attempts"));
    });
    socket.on("reconnect_attempt", function (attemptNumber) {
        console.log("Reconnection attempt #".concat(attemptNumber, " for client ").concat(socket.id));
    });
});
// Add error handling for server
io.engine.on("connection_error", function (err) {
    console.error("Connection error:", err);
});
httpServer.listen(3003, function () {
    console.log("✅ Socket.IO server running on port 3003");
});
