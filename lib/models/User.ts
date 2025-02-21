import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  image: String,
  googleId: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: Date,
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema); 