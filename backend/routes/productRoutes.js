const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  createProductReview,
  getTopProducts,
} = require("../controllers/productController");
const { protect, admin } = require("../middlewares/auth");

router.get("/top", getTopProducts);
router.route("/").get(getAllProducts).post(protect, admin, createProduct);

router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProductById)
  .delete(protect, admin, deleteProductById);

router.route("/:id/reviews").post(protect, createProductReview);

module.exports = router;
// @routes GET /api/products/top
