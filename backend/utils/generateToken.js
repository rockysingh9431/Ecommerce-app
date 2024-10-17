const jwt = require("jsonwebtoken");

const generateToken = (req, res, userId) => {
  const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // set JWT as http only cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "lax",
    maxAge: 30 * 24 * 3600 * 1000, // 30 days
  });
};
module.exports = generateToken;
