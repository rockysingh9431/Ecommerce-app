require("dotenv").config();
const express = require("express");
const products = require("./data/products");
const ConnectTOMongoDB = require("./config/db");
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
const orderRouter = require("./routes/orderRoutes");
ConnectTOMongoDB();
const PORT = process.env.PORT;
const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CookieParser middleware
app.use(cookieParser());
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running Port: ${PORT}`);
});
