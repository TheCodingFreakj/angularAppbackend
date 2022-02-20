const mongoose = require("mongoose");
// const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      trim: true,
      required: true,
      max: 32,
      unique: true,
      index: true,
      lowercase: true,
    },

    profile: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    role: [{  type: String}],
  },
  { timestamp: true }
);

module.exports = mongoose.model("User", userSchema);
