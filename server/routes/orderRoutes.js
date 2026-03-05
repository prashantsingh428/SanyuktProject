const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// ================= USER ROUTES =================
router.post("/", protect, orderController.createOrder);
router.get("/myorders", protect, orderController.myOrders);
router.get("/:id", protect, orderController.getOrder);

// ================= ADMIN ROUTES =================
router.get("/admin/all", protect, adminOnly, orderController.getAllOrders);
router.put("/admin/:id", protect, adminOnly, orderController.updateOrderStatus);

module.exports = router;
