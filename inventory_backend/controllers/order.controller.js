// controllers/order.controller.js
const Product = require("../models/product.model");
const Order = require("../models/order.model");

exports.createOrder = async (req, res) => {
  try {
    const { customerName, items } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items provided for the order" });
    }

    let totalValue = 0;
    let totalQuantity = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product with ID ${item.productId} not found` });
      }

      const productPrice = product.BuyingPrice * item.quantity;
      totalValue += productPrice;
      totalQuantity += item.quantity;

      orderItems.push({
        productId: product._id,
        quantity: item.quantity,
        price: product.BuyingPrice,
      });
    }

    const order = new Order({
      customerName,
      products: orderItems,
      totalValue,
      totalQuantity,
    });

    await order.save();

    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("products.productId", "productName productId");
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
