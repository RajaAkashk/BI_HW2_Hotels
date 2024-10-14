const mongoose = require("mongoose");

const LaptopSchema = new mongoosse.Schema(
  {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    processor: String,
    ramSizeGB: NUmber,
    storageSizeGB: NUmber,
    screenSizeInches: NUmber,
    isTouchscreen: {
      type: Boolean,
      default: false,
    },
    hasSSD: {
      type: Boolean,
      default: false,
    },
    isSaleActive: {
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

const Laptop = mongoose.model("Laptop", LaptopSchema);

module.defaults = Laptop;
