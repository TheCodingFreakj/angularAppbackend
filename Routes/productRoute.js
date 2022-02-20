const express = require("express");
const router = express.Router();
const {
  addproducts,
  getproducts,
  addproductsforapproval,
  getproductspending,
  deleteproducts
} = require("../controllers/productsController");

router.post("/add-product", addproducts);
router.get("/getproducts", getproducts);
router.get("/deleteproducts", deleteproducts);
router.get("/getpendingproducts", getproductspending);
router.post("/sendApproval", addproductsforapproval);

module.exports = router;