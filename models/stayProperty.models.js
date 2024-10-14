const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    location: String,
    pricePerNight: Number,
    capacity: Number,
    isPetFriendly: {
      type: Boolean,
      default: false,
    },
    hasWiFi: {
      type: Boolean,
      default: false,
    },
    hasParking: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timeStamps: true }
);

const Property = mongoose.model("Property", PropertySchema);

module.exports = Property;
