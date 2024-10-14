const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema(
  {
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: Number,
    mileage: Number,
    fuelType: {
      typr: String,
      enum: ["Gasoline", "Diesel", "Electric", "Hybrid"],
    },
    transmission: {
      type: String,
      enum: ["Automatic", "Manual"],
    },
    bodyStyle: String,
    color: String,
    isCertifiedPreOwned: {
      type: Boolean,
      default: false,
    },
    isFourWheelDrive: {
      type: Boolean,
      default: false,
    },
    isLuxury: {
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

const Car = mongoose.model("Car", CarSchema);

module.defaults = Car;
