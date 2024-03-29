const asyncHandler = require("../middlewares/asyncHandlers");
const Product = require("../models/productModel");

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) return res.json(product);
  else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});
module.exports = { getProductById, getAllProducts };
