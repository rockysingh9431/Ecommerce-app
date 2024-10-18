const asyncHandler = require("../middlewares/asyncHandler");
const Product = require("../models/productModel");

// @desc Create a Product
// @routes POST /api/products/
// @access private admin
const createProduct = asyncHandler(async (req, res) => {
  console.log("Create Product");
  const { name, price, description, image, brand, category, countInStock } =
    req.body;
  console.log(req.body);
  const product = new Product({
    user: req.user._id,
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  });
  console.log(product);
  const savedProduct = await product.save();
  if (!savedProduct) console.log(error);
  res.status(201).json(savedProduct);
});

// @desc GetProductsById
// @routes PUT /api/products/:id
// @access private,admin
const updateProductById = asyncHandler(async (req, res) => {
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

// @desc Delete a Product
// @routes Delete /api/products/:id
// @access private,admin
const deleteProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "Product deleted successfully" });
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
// @routes GET /api/products/:id/reviews
// @access private admin
const getAllProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};
  const products = await Product.find({ ...keyword });
  res.json({ products });
});

// @desc Create a new REview
// @routes Post /api/products
// @access Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("You have already reviewed this product");
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;
    await product.save();
    res.status(201).json({ message: "Review added successfully" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
// @desc GetTop rated products
// @routes GET /api/products/top
// @access Public
const getTopProducts = asyncHandler(async (req, res) => {
  const product = await Product.find({}).sort({ rating: -1 }).limit(3);
  return res.json(product);
});

module.exports = {
  getProductById,
  getAllProducts,
  createProduct,
  updateProductById,
  deleteProductById,
  createProductReview,
  getTopProducts,
};
