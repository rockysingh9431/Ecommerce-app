const express = require("express");
const router = express.Router();
const { admin, protect } = require("../middlewares/auth");
const {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUserById,
  updateUserById,
} = require("../controllers/userController");

router.post("/auth", authUser);
router.post("/register", registerUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.get("/", protect, admin, getUsers);
router
  .route("/:id")
  .get(protect, admin, getUserById)
  .delete(protect, admin, deleteUserById)
  .put(protect, admin, updateUserById);

module.exports = router;
