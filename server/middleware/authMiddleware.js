// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// // Protect routes
// exports.protect = async (req, res, next) => {
//     try {
//         const token = req.headers.authorization?.split(" ")[1];
//         if (!token) return res.status(401).json({ message: "Not authorized" });

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         const user = await User.findById(decoded.id).select("-password");
//         if (!user) return res.status(401).json({ message: "User not found" });

//         req.user = user; // attach user
//         next();
//     } catch (err) {
//         return res.status(401).json({ message: "Invalid or expired token" });
//     }
// };

// // Admin only
// exports.adminOnly = (req, res, next) => {
//     if (!req.user || req.user.role !== "admin") {
//         return res.status(403).json({ message: "Admin access only" });
//     }
//     next();
// };





const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Protect routes - verify token and attach user
exports.protect = async (req, res, next) => {
    try {
        let token;

        // Check if token exists in headers
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized - No token provided"
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

        // Get user from token
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Not authorized - User not found"
            });
        }

        // Attach user to request object
        req.user = user;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: "Not authorized - Invalid token"
            });
        }

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: "Not authorized - Token expired"
            });
        }

        return res.status(401).json({
            success: false,
            message: "Not authorized"
        });
    }
};

// Admin only middleware
exports.adminOnly = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "Not authorized"
        });
    }

    if (req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: "Admin access only"
        });
    }

    next();
};