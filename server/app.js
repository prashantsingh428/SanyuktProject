require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/contactRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/admin/users", require("./routes/adminUserRoutes"));
app.use("/api/admin", require("./routes/adminStatsRoutes"));
app.use("/api/franchises", require("./routes/franchiseRoutes"));
app.use("/api/grievance", require("./routes/grievanceRoutes"));
app.use("/api/recharge", require("./routes/rechargeRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

// Serve React frontend (production build)
const clientBuildPath = path.join(__dirname, "../client/dist");
app.use(express.static(clientBuildPath));

// SPA fallback — serve index.html for all non-API routes (React Router support)
app.get("*", (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
});

module.exports = app;
