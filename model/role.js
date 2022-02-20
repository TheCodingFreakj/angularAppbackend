const mongoose = require("mongoose");
// const crypto = require("crypto");

const roleSchema = new mongoose.Schema(
  {
    roleName: String,
  },
  { timestamp: true }
);

module.exports = mongoose.model("Role", userSchema);
