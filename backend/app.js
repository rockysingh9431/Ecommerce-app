require("dotenv").config();
const express = require("express");
const products = require("./data/products");
const ConnectTOMongoDB = require("./config/db");
const productRouter = require("./routes/productRoutes");
ConnectTOMongoDB();
const PORT = process.env.PORT;
const app = express();
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

app.use("/api/products", productRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running Port: ${PORT}`);
});
