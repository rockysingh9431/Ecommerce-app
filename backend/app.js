require("dotenv").config();
const cookieParser = require("cookie-parser");
const path = require("path");
const express = require("express");
const ConnectTOMongoDB = require("./config/db");
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");
const orderRouter = require("./routes/orderRoutes");
const uploadRouter = require("./routes/uploadRoutes");
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
app.use("/api/upload", uploadRouter);
app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

const _dirname = path.resolve(); // set __dirname to current working directory
app.use("/uploads", express.static(path.join(_dirname, "/uploads")));
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running Port: ${PORT}`);
});
