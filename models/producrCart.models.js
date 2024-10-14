const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productName: String,
  productDescription: String,
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  reviews: Number,
  originalPrice: Number,
  discount: Number,
  discountedPrice: Number,
  availableOffer: [
    {
      type: String,
    },
  ],
  productWarranty: String,
  varient: [
    {
      type: String,
    },
  ],
  isConnectivity: Boolean,
  productImage: String,
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
