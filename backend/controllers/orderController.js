const asyncHandler = require("../middlewares/asyncHandler");
const Order = require("../models/orderModel");

// @desc create a new order
// @route POST /api/orders
// @access private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createOrder = await order.save();
    res.status(201).json(createOrder);
  }
});

// @desc get all order items
// @route GET /api/orders/myorders
// @access private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find(req.user._id);
  res.status(200).json(orders);
});

// @desc get order by id
// @route GET /api/orders/:id
// @access private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) res.status(200).json(order);
  else {
    throw new Error("Order not found");
  }
});

// @desc update order to paid
// @route PUT /api/orders/:id/pay
// @access private/admin
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
  }
});

// @desc update order to delivered
// @route PUT/api/orders/:id/deliver
// @access private/admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("Order delivered");
});

// @desc Get all Orders
// @route GET /api/orders
// @access private/admin
const getOrders = asyncHandler(async (req, res) => {
  res.send("get All orders admin");
});

module.exports = {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
