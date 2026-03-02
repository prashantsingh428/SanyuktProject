const Razorpay = require('razorpay');
const crypto = require('crypto');
const Transaction = require('../models/Transaction');

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_YourTestKeyId',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'YourTestKeySecret'
});

// @desc    Create a new recharge order
// @route   POST /api/recharge/create-order
// @access  Public (Should be protected in production)
exports.createOrder = async (req, res) => {
    try {
        const { amount, type, operator, rechargeNumber, userId } = req.body;

        if (!amount || !type || !operator || !rechargeNumber) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if we are using placeholder keys
        const isMocking = process.env.RAZORPAY_KEY_ID === 'rzp_test_your_key_here' || !process.env.RAZORPAY_KEY_ID;
        let order;

        if (isMocking) {
            // Create a mock order
            order = {
                id: `order_mock_${Date.now()}`,
                entity: "order",
                amount: amount * 100,
                amount_paid: 0,
                amount_due: amount * 100,
                currency: "INR",
                receipt: `receipt_order_${Date.now()}`,
                status: "created",
                attempts: 0,
                notes: [],
                created_at: Math.floor(Date.now() / 1000)
            };
        } else {
            // Razorpay expects amount in paise (multiply by 100)
            const options = {
                amount: amount * 100,
                currency: "INR",
                receipt: `receipt_order_${Date.now()}`
            };

            order = await razorpay.orders.create(options);
        }

        if (!order) {
            return res.status(500).json({ message: "Failed to create order" });
        }

        // Save initial transaction state as pending
        const transaction = await Transaction.create({
            userId: userId || '60d0fe4f5311236168a109ca', // Dummy user ID for now if not provided
            amount,
            type,
            operator,
            rechargeNumber,
            status: 'pending',
            razorpayOrderId: order.id
        });

        res.status(200).json({
            success: true,
            order,
            transactionId: transaction._id
        });
    } catch (error) {
        console.error("Create order error:", error);
        res.status(500).json({ message: "Server error", error: error.message || error.toString(), detailed: error });
    }
};

// @desc    Verify Razorpay payment signature
// @route   POST /api/recharge/verify-payment
// @access  Public
exports.verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            transactionId
        } = req.body;

        const secret = process.env.RAZORPAY_KEY_SECRET || 'YourTestKeySecret';
        const isMocking = process.env.RAZORPAY_KEY_ID === 'rzp_test_your_key_here' || !process.env.RAZORPAY_KEY_ID;

        let isAuthentic = false;

        if (isMocking) {
            // Always authenticate mock payments
            isAuthentic = true;
        } else {
            const body = razorpay_order_id + "|" + razorpay_payment_id;
            const expectedSignature = crypto
                .createHmac("sha256", secret)
                .update(body.toString())
                .digest("hex");

            isAuthentic = expectedSignature === razorpay_signature;
        }

        if (isAuthentic) {
            // Update transaction status to success
            await Transaction.findByIdAndUpdate(transactionId, {
                status: 'success',
                razorpayPaymentId: razorpay_payment_id,
                transactionId: `TXN${Date.now()}` // Generate a unique TXN ID for your system
            });

            res.status(200).json({
                success: true,
                message: "Payment verified successfully"
            });
        } else {
            // Update transaction status to failed
            await Transaction.findByIdAndUpdate(transactionId, {
                status: 'failed'
            });

            res.status(400).json({
                success: false,
                message: "Payment verification failed"
            });
        }
    } catch (error) {
        console.error("Verify payment error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
