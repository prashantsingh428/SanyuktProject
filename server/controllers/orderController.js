const Order = require("../models/Order");
const Product = require("../models/Product");
const { processOrderMLM } = require("../utils/mlmOrderUtils");

// ================= CREATE ORDER =================
exports.createOrder = async (req, res) => {
    try {
        const {
            product: productId,
            quantity,
            shippingInfo,
            paymentMethod,
            subtotal,
            shipping,
            tax,
            discount,
            total
        } = req.body;

        // Fetch product to get BV
        const productData = await Product.findById(productId);
        if (!productData) {
            return res.status(404).json({ message: "Product not found" });
        }

        const orderBv = (productData.bv || 0) * (quantity || 1);
        const orderPv = orderBv / 1000; // 1000 BV = 1 PV ratio based on package data

        const order = new Order({
            user: req.user._id,
            product: productId,
            quantity,
            shippingInfo,
            paymentMethod,
            subtotal,
            shipping,
            tax,
            discount,
            total,
            bv: orderBv,
            pv: orderPv,
            tracking: [{
                status: 'pending',
                message: 'Order placed successfully',
                timestamp: new Date()
            }]
        });

        await order.save();

        // Trigger MLM Point Processing
        // We do this asynchronously to not block the response, 
        // but we catch any errors within the util.
        processOrderMLM(req.user._id, orderBv, orderPv);

        res.status(201).json(order);
    } catch (error) {
        console.error("Order creation error:", error);
        res.status(500).json({ message: "Failed to place order" });
    }
};

// ================= GET LOGGED IN USER ORDERS =================
exports.myOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .populate("product", "name image price")
            .sort("-createdAt");

        res.json(orders);
    } catch (error) {
        console.error("Fetch orders error:", error);
        res.status(500).json({ message: "Failed to fetch orders" });
    }
};

// ================= GET SINGLE ORDER =================
exports.getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate("product", "name image price")
            .populate("user", "name email");

        if (!order) return res.status(404).json({ message: "Order not found" });

        // Ensure user owns order or is admin
        if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized" });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// ================= ADMIN: GET ALL ORDERS =================
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("product", "name image price")
            .populate("user", "name email")
            .sort("-createdAt");

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// ================= ADMIN: UPDATE STATUS =================
exports.updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });

        order.status = req.body.status;

        // Add to tracking history
        order.tracking.push({
            status: req.body.status,
            message: req.body.message || `Order status updated to ${req.body.status}`,
            timestamp: new Date()
        });

        await order.save();
        res.json({ message: "Order status updated", order });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
