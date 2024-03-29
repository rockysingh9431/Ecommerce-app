require("dotenv").config();
const mongoose = require("mongoose");
const colors = require("colors");
const users = require("./data/users");
const products = require("./data/products");
const Product = require("./models/productModel");
const User = require("./models/userModel");
const Order = require("./models/orderModel");
const Review = require("./models/reviewmodel");
const ConnectToMongoDB = require("./config/db");

ConnectToMongoDB();
const importData = async () => {
  try {
    await Review.deleteMany();
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampleProducts);

    console.log("Data Imported !".green.inverse);
    process.exit();
  } catch (err) {
    console.error(`${err}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") destroyData();
else importData();
