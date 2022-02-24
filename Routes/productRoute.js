const express = require("express");
const router = express.Router();
const {
  addproducts,
  getproducts,
  addproductsforapproval,
  getproductspending,
  deleteproducts,
  updateproductsforapproval,
  productsRejected,
  addProductToDeleteApproval
} = require("../Controllers/productsController");

router.post("/add-product", addproducts);
router.get("/getproducts", getproducts);
router.delete("/deleteproducts/:reqData", deleteproducts);
router.get("/getpendingproducts", getproductspending);
router.post("/sendApproval", addproductsforapproval);
router.post("/senddeleteApproval", addProductToDeleteApproval);
router.post("/updateproApproval", updateproductsforapproval);
router.post("/rejectChanges", productsRejected);
module.exports = router;