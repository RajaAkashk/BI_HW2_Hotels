const mongoose = require("mongoose");

const PlayerProfileSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: Number,
    gender: {
      type: gamesPlayed,
      enum: ["Male", "Female", "Other"],
    },
    country: String,
    isActive: { type: Boolean, default: true },
    gamesPlayed: Number,
    level: {
      type: Number,
      enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
    },
    preferredGame: String,
  },
  { timestamps: true }
);

const PlayerProfile = mongoose.model("PlayerProfile", PlayerProfileSchema);

module.exports = PlayerProfile;
