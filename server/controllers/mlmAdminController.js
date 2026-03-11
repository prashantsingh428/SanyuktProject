const User = require("../models/User");
const BinaryTree = require("../models/BinaryTree");
const IncomeHistory = require("../models/IncomeHistory");

/**
 * Get All Users for Admin
 */
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select("-password -otp");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Get Binary Tree for Admin / User
 */
exports.getBinaryTree = async (req, res) => {
    try {
        const { userId } = req.params;
        const tree = await BinaryTree.findOne({ userId }).populate("userId", "userName memberId position rank");
        
        if (!tree) return res.status(404).json({ message: "Tree not found" });

        // Recursive function to build tree data
        const buildTree = async (uId) => {
            const node = await BinaryTree.findOne({ userId: uId }).populate("userId", "userName memberId position rank");
            if (!node) return null;

            return {
                id: node.userId._id,
                name: node.userId.userName,
                memberId: node.userId.memberId,
                position: node.position,
                rank: node.userId.rank,
                leftPV: node.leftPV,
                rightPV: node.rightPV,
                children: [
                    await buildTree(node.leftId),
                    await buildTree(node.rightId)
                ].filter(child => child !== null)
            };
        };

        const fullTree = await buildTree(userId);
        res.json(fullTree);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Manage User Status
 */
exports.updateUserStatus = async (req, res) => {
    try {
        const { userId, activeStatus } = req.body;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.activeStatus = activeStatus;
        await user.save();
        res.json({ message: `User status updated to ${activeStatus ? 'Active' : 'Inactive'}` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Get MLM Stats for a specific user
 */
exports.getMLMStats = async (req, res) => {
    try {
        const userId = req.params.userId || req.user._id;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const tree = await BinaryTree.findOne({ userId });
        
        // Count direct referrals
        const directCount = await User.countDocuments({ sponsorId: user.memberId });

        // Build the stats object
        const stats = {
            walletBalance: user.walletBalance,
            pv: user.pv,
            bv: user.bv,
            rank: user.rank,
            activeStatus: user.activeStatus,
            directCount: directCount,
            leftPV: tree ? tree.leftPV : 0,
            rightPV: tree ? tree.rightPV : 0,
            leftBV: tree ? tree.leftBV : 0,
            rightBV: tree ? tree.rightBV : 0,
            totalLeft: tree ? tree.totalLeft : 0,
            totalRight: tree ? tree.totalRight : 0,
            totalDownline: (tree ? tree.totalLeft : 0) + (tree ? tree.totalRight : 0)
        };

        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Get Direct Referrals for a user
 */
exports.getDirects = async (req, res) => {
    try {
        const userId = req.params.userId || req.user._id;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const directs = await User.find({ sponsorId: user.memberId }).select("-password -otp");
        res.json(directs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Get Income Reports
 */
exports.getIncomeReports = async (req, res) => {
    try {
        const reports = await IncomeHistory.find({})
            .populate("userId", "userName memberId")
            .populate("fromUserId", "userName memberId")
            .sort({ date: -1 });
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
