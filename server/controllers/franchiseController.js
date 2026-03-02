const Franchise = require("../models/Franchise");

// ================= ADD =================
exports.addFranchise = async (req, res) => {
    try {
        const { franchiseId, name, mobile, address, password } = req.body;

        // Check if franchise exists
        const exist = await Franchise.findOne({ franchiseId });

        if (exist) {
            return res.status(400).json({
                message: "Franchise already exists"
            });
        }

        // बिना bcrypt के सीधा पासवर्ड सेव करें
        const franchise = await Franchise.create({
            franchiseId,
            name,
            mobile,
            address,
            password: password  // सीधा पासवर्ड
        });

        res.status(201).json({
            message: "Franchise Added Successfully",
            franchise
        });

    } catch (err) {
        console.error("Add Franchise Error:", err);
        res.status(500).json({ message: err.message });
    }
};

// ================= PUBLIC LIST =================
exports.getFranchiseList = async (req, res) => {
    try {
        const data = await Franchise.find().select("-password");
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ================= ADMIN LIST =================
exports.getAdminFranchiseList = async (req, res) => {
    try {
        const data = await Franchise.find().select("+password");
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};