'use client';

import React, { useEffect, useState } from "react";
import io, { Socket as SocketType } from "socket.io-client";
import { motion } from 'framer-motion';

let socket: typeof SocketType | undefined;

export default function Chat() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Initialize socket connection
    if (!socket) {
      socket = io("http://localhost:3003", {
        reconnectionAttempts: 5,
        timeout: 10000,
      });
    }

    // Connection handlers
    socket.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to chat server');
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from chat server');
    });

    // Message handler
    socket.on("chat message", (msg: string) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Cleanup
    return () => {
      socket?.off("chat message");
      socket?.off("connect");
      socket?.off("disconnect");
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() && isConnected && socket) {
      socket.emit("chat message", input);
      setInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div
      className="w-full max-w-md p-6 rounded-lg bg-black/50 backdrop-blur-sm border border-purple-600/20"
    >
      <h2 className="text-2xl font-bold mb-4 text-purple-400">RoadResQ Chat</h2>
      
      <div className="h-[300px] overflow-y-auto mb-4 p-4 rounded-lg bg-black/30 border border-purple-600/10">
        {messages.map((msg: string, index: number) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-2 p-2 rounded bg-purple-600/10 text-white"
          >
            {msg}
          </motion.p>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 rounded-lg bg-black/30 border border-purple-600/20 
                     focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 
                     text-white placeholder-gray-400"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={sendMessage}
          disabled={!isConnected}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 
                     disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Send
        </motion.button>
      </div>

      {!isConnected && (
        <p className="mt-2 text-red-400 text-sm">
          Disconnected from chat server. Attempting to reconnect...
        </p>
      )}
    </div>
  );
} 