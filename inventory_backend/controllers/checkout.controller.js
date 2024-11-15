const Product = require("../models/product.model");
const Order = require("../models/order.model");

exports.createCheckout = async (req, res) => {
    try {
        const { customerName, product } = req.body;

        // Check if product items exist in the request
        if (!product || product.length === 0) {
            return res.status(400).json({ message: "No items provided for the order" });
        }

        let totalValue = 0;
        let totalQuantity = 0;
        const orderItems = [];

        // Iterate over each product item in the order
        for (const item of product) {
            const productDetails = await Product.findOne({ productId: item.productId });

            // Product not found in the database
            if (!productDetails) {
                return res.status(404).json({ message: `Product with ID ${item.productId} not found` });
            }

            // Calculate total price for the item
            const productTotalPrice = productDetails.BuyingPrice * item.Quantity;
            totalValue += productTotalPrice;
            totalQuantity += item.Quantity;

            // Add item to order items
            orderItems.push({
                productId: productDetails._id,
                quantity: item.Quantity,
            });
        }

        // Create and save the order
        const order = new Order({
            customerName,
            products: orderItems,
            totalValue,
            totalQuantity
        });
        await order.save();

        // Send success response
        res.status(201).json({
            message: "Order created successfully",
            order,
            totalValue,
            totalQuantity
        });

    } catch (error) {
        console.error("Error in createCheckout:", error);  // Improved error logging
        res.status(500).json({ message: "Internal server error" });
    }
};
