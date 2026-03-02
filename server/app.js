require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/contactRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/admin/users", require("./routes/adminUserRoutes"));
app.use("/api/franchises", require("./routes/franchiseRoutes"));
app.use("/api/recharge", require("./routes/rechargeRoutes"));

// Error handling for unknown routes
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

module.exports = app;