const asyncHandler = require("../middlewares/asyncHandler");
const Product = require("../models/productModel");

// @desc Create a Product
// @routes POST /api/products/
// @access private admin
const createProduct = asyncHandler(async (req, res) => {
  console.log("product created");
  const product = new Product({
    name: "sample",
    price: 0,
    user: req.user._id,
    image: "/image/sample.jpg",
    category: "sample category",
    countInStock: 0,
    numReviews: 0,
    brand: "sample brand",
    description: "sample description",
  });
  const savedProduct = await product.save();
  res.status(201).json(savedProduct);
});

// @desc GetProductsById
// @routes PUT /api/products/:id
// @access private,admin
const updateProductById = asyncHandler(async (req, res) => {
  console.log("hello");
  const { name, price, description, image, brand, category, countInStock } =
    req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.image = image || product.image;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.countInStock = countInStock;
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
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
module.exports = {
  getProductById,
  getAllProducts,
  createProduct,
  updateProductById,
};
