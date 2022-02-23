const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const stagingproductSchema = new mongoose.Schema(
  {
    id: String,
    name: {
      type: String,
    },
    imageUrls: {
      type: Array,
    },
    price: Number,
    desc: String,
    flavors: Array,
    sizes: String,
    approvStatus: Boolean,
    deleteStatus: { type: Boolean, default: "false" },
    approvStatus: { type: Boolean, default: "false" },
    rejectStatus: { type: Boolean, default: "false" },
    added_by: String,
    approved_by: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("StagingProduct", stagingproductSchema);
