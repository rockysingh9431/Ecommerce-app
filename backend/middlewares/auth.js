const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");
const User = require("../models/userModel");

// Protect Routes
const protect = asyncHandler(async (req, res, next) => {
  // Read the token from cookie
  const token = req.cookies.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized, No token");
  }
});

//Admin Middleware

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) next();
  else {
    res.status(401);
    throw new Error("Not Authorised as Admin");
  }
};

module.exports = { admin, protect };
