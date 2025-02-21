import mongoose, { Connection } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string; // ✅ Explicitly cast as string

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// 🔥 Fix: Explicitly define `global.mongoose`
declare global {
  var mongoose: { conn: Connection | null; promise: Promise<Connection> | null };
}

// 🔥 Fix: Ensure `global.mongoose` exists
global.mongoose = global.mongoose || { conn: null, promise: null };

let cached = global.mongoose;

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    // 🔥 Fix: Ensure `MONGODB_URI` is a string
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => m.connection);
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.error("MongoDB connection error:", error);
    throw error;
  }
}
