const express = require("express");
const router = express.Router();
const {
  addproducts,
  getproducts,
  addproductsforapproval,
  getproductspending,
  deleteproducts,
  updateproductsforapproval
} = require("../controllers/productsController");

router.post("/add-product", addproducts);
router.get("/getproducts", getproducts);
router.get("/deleteproducts", deleteproducts);
router.get("/getpendingproducts", getproductspending);
router.post("/sendApproval", addproductsforapproval);
router.post("/updateproApproval", updateproductsforapproval);
module.exports = router;