require("dotenv").config();
const cookieParser = require("cookie-parser");
const path = require("path");
const express = require("express");
const ConnectTOMongoDB = require("./config/db");
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");
const orderRouter = require("./routes/orderRoutes");
const uploadRouter = require("./routes/uploadRoutes");
const cors = require("cors");
ConnectTOMongoDB();
const PORT = process.env.PORT;
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // Your frontend's URL
    credentials: true, // Allow cookies and other credentials to be sent
  })
);

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

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(_dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is Running.....");
  });
}
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running Port: ${PORT}`);
});
