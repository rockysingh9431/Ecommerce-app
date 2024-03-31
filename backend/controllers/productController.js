const asyncHandler = require("../middlewares/asyncHandler");
const Product = require("../models/productModel");

// @desc GetProductsById
// @routes GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) return res.json(product);
  else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc GetAllProducts
// @routes GET /api/products
// @access Public
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});
module.exports = { getProductById, getAllProducts };
