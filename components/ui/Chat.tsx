"use client";

import { useState, useEffect } from "react";
import io from "socket.io-client";
import { motion } from "framer-motion";

// Create socket instance outside component to prevent multiple connections
const socket = io("http://192.168.137.1:3003", {
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  transports: ["websocket", "polling"]
});

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      console.log("Connected to server:", socket.id);
    }

    function onDisconnect() {
      setIsConnected(false);
      console.log("Disconnected from server");
    }

    function onMessage(message: string) {
      console.log("Received message:", message);
      setMessages(prev => [...prev, message]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("receiveMessage", onMessage);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("receiveMessage", onMessage);
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() && isConnected) {
      socket.emit("sendMessage", input);
      setInput("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md p-6 rounded-lg bg-black/50 backdrop-blur-sm border border-purple-600/20"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-purple-400">RoadResQ Chat</h2>
        <span className={`px-2 py-1 rounded ${isConnected ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
          {isConnected ? "Connected ✅" : "Disconnected ❌"}
        </span>
      </div>

      <div className="h-[300px] overflow-y-auto mb-4 p-4 rounded-lg bg-black/30 border border-purple-600/10">
        {messages.map((msg, index) => (
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
    </motion.div>
  );
}
