<<<<<<< HEAD
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
=======
"use client";

import { useState, useEffect, useRef } from "react";
import SocketClient from "@/lib/socket-client";

interface Message {
  text: string;
  userId: string;
  timestamp: string;
  id: string;
}

const MessageBubble = ({ message, isOwnMessage }: { message: Message; isOwnMessage: boolean }) => (
  <div
    className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
  >
    <div
      className={`max-w-[80%] rounded-lg p-3 ${
        isOwnMessage
          ? 'bg-purple-600 text-white'
          : 'bg-gray-700 text-gray-200'
      }`}
    >
      <div className="break-words">{message.text}</div>
      <div className="text-xs mt-1 opacity-75">
        {new Date(message.timestamp).toLocaleTimeString()}
      </div>
    </div>
  </div>
);

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<any>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!isClient) return;

    try {
      // Load saved messages
      const saved = localStorage.getItem("chatMessages");
      if (saved) {
        const parsedMessages = JSON.parse(saved);
        setMessages(parsedMessages);
      }

      // Initialize socket
      const socket = SocketClient.getInstance({
        url: "http://192.168.137.1:3003"
      });
      
      socketRef.current = socket;

      socket.on("connect", () => {
        setIsConnected(true);
      });

      socket.on("disconnect", () => {
        setIsConnected(false);
      });

      socket.on("receiveMessage", (message: Message) => {
        setMessages(prev => {
          if (prev.some(m => m.id === message.id)) {
            return prev;
          }
          const updated = [...prev, message];
          localStorage.setItem("chatMessages", JSON.stringify(updated));
          return updated;
        });
      });

      return () => {
        socket.off("connect");
        socket.off("disconnect");
        socket.off("receiveMessage");
      };
    } catch (error) {
      console.error("Error in chat initialization:", error);
    }
  }, [isClient]);

  const generateMessageId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleSend = () => {
    if (!input.trim() || !isClient || !socketRef.current) return;

    try {
      const socket = socketRef.current;
      
      const newMessage: Message = {
        text: input.trim(),
        userId: socket.id || 'local',
        timestamp: new Date().toISOString(),
        id: generateMessageId()
      };

      setMessages(prev => {
        const updated = [...prev, newMessage];
        localStorage.setItem("chatMessages", JSON.stringify(updated));
        return updated;
      });

      socket.emit("sendMessage", newMessage);
      setInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (!isClient) {
    return (
      <div className="flex flex-col h-full bg-gray-900">
        <div className="bg-purple-600 p-4 rounded-t-lg">
          <h2 className="text-white font-semibold">RoadResQ Chat</h2>
          <div className="text-xs text-purple-200">Connecting...</div>
        </div>
        <div className="flex-1 p-4">
          <div className="text-center text-gray-500">Loading chat...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-900">
      <div className="bg-purple-600 p-4 rounded-t-lg">
        <h2 className="text-white font-semibold">RoadResQ Chat</h2>
        <div className="text-xs text-purple-200">
          {isConnected ? "Connected " : "Disconnected "}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500">
            No messages yet. Start a conversation!
          </div>
        ) : (
          messages.map(msg => (
            <div key={msg.id} className="mb-4">
              <MessageBubble 
                message={msg} 
                isOwnMessage={msg.userId === socketRef.current?.id} 
              />
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-gray-800 border-t border-gray-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
>>>>>>> 7f5fc52 (first commit)
