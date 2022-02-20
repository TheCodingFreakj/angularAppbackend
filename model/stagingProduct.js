const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const stagingproductSchema = new mongoose.Schema(
  {
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
    added_by:String,
    approved_by:String
  },
  { timestamps: true }
);

module.exports = mongoose.model("StagingProduct", stagingproductSchema);