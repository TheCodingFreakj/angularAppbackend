const Product = require("../model/product");
const Approval = require("../model/stagingProduct");
const getproducts = async (req, res, next) => {
  const products = await Product.find({approvStatus:true}).sort({ price: -1 });
  res.json(products);
};

const addproducts = async (req, res, next) => {
  //console.log(req.body);
  try {
    if (req.body.role === "User") {
      return res.status(400).json({
        message: "You Dont Have Access Right To Approve",
      });
    }

    if (req.body.role === "Admin") {
      let oldproduct = await Product.findOne({
        name: req.body.name,
      });
      //console.log(oldproduct);
      if (oldproduct !== null) {
        if (oldproduct.id === req.body.id) {
          const updatedPlot = await Product.findOneAndUpdate(
            { name: req.body.name },
            { $set: req.body },
            { new: false }
          );
          const product = await updatedPlot.save();
          await Approval.findOneAndRemove({ name: req.body.name })
          return res.json({ message: "new product reapproved" });
        }
      } else {
        const newProduct = new Product({
          id: req.body.id,
          name: req.body.name,
          imageUrls: req.body.imageUrls,
          desc: req.body.desc,
          price: req.body.price,
          flavors: req.body.flavors,
          sizes: req.body.size,
          added_by: req.body.added_by,
          approvStatus: req.body.approvStatus,
          approved_by: req.body.approved_by,
        });


        const product = await newProduct.save();
        return res.json({ message: "new product approved" });
      }
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err,
    });
  }
};

const addproductsforapproval = async (req, res, next) => {
  console.log(req.body);
  try {
    let oldproduct = await Product.findOne({
      name: req.body.productValue.productname,
    });
    if (oldproduct) {
      const updatedPlot = await Approval.findOneAndUpdate(
        { name: req.body.productValue.productname },
        { $set: req.body },
        { new: false }
      );
      const product = await updatedPlot.save();
      return res.json({ message: "existing product resent for approval" });
    }

    const newProduct = new Approval({
      name: req.body.productValue.productname,
      imageUrls: req.body.urlsSelected,
      desc: req.body.productValue.desc,
      price: req.body.productValue.price,
      flavors: req.body.productValue.flavors,
      sizes: req.body.size,
      added_by: req.body.added_by,
      approvStatus: req.body.approvStatus,
      approved_by: req.body.approved_by,
    });
    const product = await newProduct.save();
    return res.json({
      message: "new product added for approval",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err,
    });
  }
};

const getproductspending = async (req, res, next) => {
  const products = await Approval.find().sort({ price: -1 });
  res.json(products);
};
const deleteproducts = async (req, res, next) => {
  const products = await Approval.find().sort({ price: -1 });
  res.json(products);
};

module.exports = {
  addproducts,
  getproducts,
  addproductsforapproval,
  getproductspending,
  deleteproducts,
};
