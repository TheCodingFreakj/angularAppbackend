const Product = require("../model/product");
const Approval = require("../model/stagingProduct");
const getproducts = async (req, res, next) => {
  const products = await Product.find({}).sort({
    price: -1,
  });

  console.log(products);
  return res.json({ products: products });
};

const productsRejected = async (req, res, next) => {
  //console.log(req.body);
  try {
    //await Approval.findOneAndRemove({ name: req.body.name });
    const products = await Product.find({ name: req.body.name }).sort({
      price: -1,
    });
    //console.log(products);
    console.log(products);
    products.map(async (product) => {
      console.log(product);
      if (req.body.name === product.name) {
        product.rejectStatus = true;
        await product.save();
      }
    });

    //console.log(products);

    await Approval.findOneAndRemove({ name: req.body.name });
    return res.status(200).json({
      message: "It is rejected",
    });
  } catch (err) {
    console.log(err);
  }
};

const updateproductsforapproval = async (req, res, next) => {
  const updatedPlot = await Approval.findOneAndUpdate(
    { name: req.body.productValue.productname },
    { $set: req.body },
    { new: false }
  );
  const product = await updatedPlot.save();
  return res.json({ message: "existing product resent for approval" });
};

const addproducts = async (req, res, next) => {
  console.log(req.body);
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
        console.log(oldproduct.id);
        console.log(req.body.id);
        if (oldproduct.name === req.body.name) {
          const updatedPlot = await Product.findOneAndUpdate(
            { name: req.body.name },
            { $set: req.body },
            { new: false }
          );
          const product = await updatedPlot.save();
          await Approval.findOneAndRemove({ name: req.body.name });
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
          sizes: req.body.sizes,
          added_by: req.body.added_by,
          approvStatus: req.body.approvStatus,
          approved_by: req.body.approved_by,
        });
        const product = await newProduct.save();
        console.log(product);
        await Approval.findOneAndRemove({ name: req.body.name });
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
const addProductToDeleteApproval = async (req, res, next) => {
  console.log(req.body);
  try {
    let productinapprovallist = await Approval.findOne({
      name: req.body.idDelete.name,
    });

    if (productinapprovallist) {
      console.log("exists");
      const updatedPlot = await Product.findOneAndUpdate(
        { name: req.body.idDelete.name },
        { $set: req.body },
        { new: false }
      );
      updatedPlot.save()
      // return res.status(400).json({
      //   message: "You have already send the delete request ",
      // });

      return res.json({
        message: "existing product added for delete approval",
      });
    }

    if (!productinapprovallist) {
      console.log("donet exists");

      const newProduct = new Approval({
        id: req.body.idDelete.id,
        name: req.body.idDelete.name,
        imageUrls: req.body.idDelete.imageUrls,
        desc: req.body.idDelete.desc,
        price: req.body.idDelete.price,
        flavors: req.body.idDelete.flavors,
        sizes: req.body.idDelete.size,
        added_by: req.body.idDelete.added_by,
        deleteStatus: req.body.statusReject,
        approved_by: req.body.idDelete.approved_by,
      });
      const product = await newProduct.save();
      const updatedPlot = await Product.findOneAndUpdate(
        { name: req.body.idDelete.name },
        { $set: req.body },
        { new: false }
      );
      updatedPlot ? await updatedPlot.save() : null;
      return res.json({
        message: "new product added for delete approval",
      });
    }
  } catch (err) {
    console.log(err);
  }
};
const addproductsforapproval = async (req, res, next) => {
  console.log(req.body);
  try {
    //if (req.body.rejectStatus === true) {
    // await Product.findOneAndRemove({
    //   name: req.body.idDelete,
    // });

    // await Approval.findOneAndRemove({
    //   name: req.body.productValue.productname,
    // });
    //}
    //check if the product exist in products
    let productinapprovallist = await Approval.findOne({
      name: req.body.productValue.productname,
    });
    if (productinapprovallist) {
      console.log("exists in approval listy");
      const updatedPlot = await Product.findOneAndUpdate(
        { name: req.body.productValue.productname },
        { $set: req.body },
        { new: false }
      );
      updatedPlot.save();
      // await Approval.findOneAndRemove({
      //   name: req.body.productValue.productname,
      // });
      return res.json({ message: "existing product resent for approval" });
    }

    if (!productinapprovallist) {
      console.log("does not exist in approval");
      const newProduct = new Approval({
        id: req.body.id,
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

      const updatedPlot = await Product.findOneAndUpdate(
        { name: req.body.productValue.productname },
        { $set: req.body },
        { new: false }
      );
      console.log(updatedPlot)
      updatedPlot ? await updatedPlot.save() : null;
      return res.json({
        message: "new product added for approval",
      });
    }
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
  console.log(req.params);
  console.log(req.query.approveStatus);

  try {
    if (req.query.approveStatus === "true") {
      const productdel = await Approval.findOneAndRemove({
        name: req.params.reqData,
      });

      const deletedp = await Product.findOneAndRemove({
        name: req.params.reqData,
      });
      res.json({ message: "Product deleted" });
    } else {
      const productdel = await Approval.findOneAndRemove({
        name: req.params.reqData,
      });
      res.json({ message: "Product delete Rejected" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addproducts,
  getproducts,
  addproductsforapproval,
  getproductspending,
  deleteproducts,
  updateproductsforapproval,
  productsRejected,
  addProductToDeleteApproval,
};
