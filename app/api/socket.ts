import { Server as SocketServer } from "socket.io";
import { Server as HTTPServer } from 'http';
import { NextApiRequest, NextApiResponse } from "next";
import { Socket } from 'net';

interface ServerType extends HTTPServer {
  io?: SocketServer;
}

interface SocketType extends Socket {
  server: ServerType;
}

interface ResponseType extends NextApiResponse {
  socket: SocketType;
}

export default function handler(req: NextApiRequest, res: ResponseType) {
  if (!res.socket?.server?.io) {
    console.log("Initializing Socket.io server...");

    const io = new SocketServer(res.socket.server as HTTPServer, {
      path: "/api/socket",
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      console.log("User connected:", socket.id);

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });

    res.socket.server.io = io;
  }

  res.end();
}
