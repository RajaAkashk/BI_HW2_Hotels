const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    firstName: String,
    lastName: String,
    birthdate: Number,
    isActive: { type: Boolean, default: true },
    isAdmin: { type: Boolean, default: false },
    profilePictureUrl: String,
  },
  { timeStamps: true }
);

const UserProfile = mongoose.model("UserProfile", UserProfileSchema);

module.exports = UserProfile;
