const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  getProductById,
  updateProductById,
} = require("../controllers/productController");
const { protect, admin } = require("../middlewares/auth");

router.route("/").get(getAllProducts).post(protect, admin, createProduct);

router.route("/:id").get(getProductById).put(protect, admin, updateProductById);
router;

module.exports = router;
