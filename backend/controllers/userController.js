const asyncHandler = require("../middlewares/asyncHandler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

// @desc Auth User and Get token
// @routes POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(req, res, user._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

// @desc Register User
// @routes POST /api/users/signup
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exist");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
    });
  }
});

// @desc Logout User / clearCookie
// @routes POST /api/users/logout
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  /*
   * res.clearCookie('token',{httpOnly:true})
   * */

  res.status(200).json({ message: "Logged Out Succesfully" });
});

// @desc GetUserProfile
// @routes GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

// @desc UpdateUserProfile
// @routes PUT /api/users/updateProfile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

// @desc GetUsers
// @routes GET /api/users
// @access Private
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

// @desc getUserById
// @routes GET /api/users/:id
// @access Private
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    return res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

// @desc DeleteUser
// @routes Delete /api/users/:id
// @access Private
const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("You can't delete admin user");
    }
    await User.deleteOne({ _id: user._id });
    res.status(200).json({ message: "product deleted successfully" });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

// @desc updateUsers
// @routes PUT /api/users/:id
// @access Private
const updateUserById = asyncHandler(async (req, res) => {
  console.log("hello");
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

module.exports = {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUserById,
  updateUserById,
};
