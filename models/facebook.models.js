const mongoose = require("mongoose");

const FacebookSchema = new mongoose.Schema(
  {
    username: String,
    isValidated: Boolean,
    postContent: String,
    postImage: String,
    like: Number,
    comment: Number,
    share: Number,
  },
  { timestamps: true }
);

const Facebook = mongoose.model("Facebook", FacebookSchema);

module.exports = Facebook;
