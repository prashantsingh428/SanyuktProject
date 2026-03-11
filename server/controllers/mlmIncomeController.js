const User = require("../models/User");
const BinaryTree = require("../models/BinaryTree");
const IncomeHistory = require("../models/IncomeHistory");
const { PACKAGES } = require("../utils/mlmLogic");

/**
 * Calculate Daily Matching Bonus
 */
exports.calculateMatchingBonus = async () => {
    try {
        const trees = await BinaryTree.find({});
        
        for (const tree of trees) {
            const user = await User.findById(tree.userId);
            if (!user || user.packageType === "none") continue;

            const packageInfo = PACKAGES[user.packageType];
            const capping = packageInfo.capping;

            // Calculate current matching
            // Available to match = totalPV - matchedPV
            // We use leftPV and rightPV as total accumulators
            // matchedPV is what we already paid for
            
            // Actually, a better way: leftPV and rightPV are current totals.
            // We match the minimum of (leftPV - paidLeftPV) and (rightPV - paidRightPV)
            // But let's stick to the simplest interpretation of matching.
            
            const leftAvailable = tree.leftPV - tree.matchedPV;
            const rightAvailable = tree.rightPV - tree.matchedPV;
            
            const matchingPV = Math.min(leftAvailable, rightAvailable);

            if (matchingPV >= 0.25) {
                // Calculate income: 0.25 PV = ₹100 -> ₹400 per 1 PV
                let income = matchingPV * 400;

                // Respect daily capping
                if (income > capping) income = capping;

                if (income > 0) {
                    user.walletBalance += income;
                    await user.save();

                    tree.matchedPV += matchingPV;
                    await tree.save();

                    await IncomeHistory.create({
                        userId: user._id,
                        fromUserId: user._id, // Self or system
                        amount: income,
                        type: "Matching",
                        description: `Matching bonus for ${matchingPV} PV`
                    });
                }
            }
        }
    } catch (error) {
        console.error("Error calculating matching bonus:", error);
    }
};

/**
 * Calculate Profit Sharing Bonus (4% of company turnover)
 * turnover: total amount from all joining packages today
 */
exports.calculateProfitSharing = async (dailyTurnover) => {
    try {
        const profitPool = dailyTurnover * 0.04;
        const activeUsers = await User.find({ activeStatus: true, pv: { $gt: 0 } });
        
        if (activeUsers.length === 0) return;

        const totalCompanyPV = activeUsers.reduce((sum, u) => sum + u.pv, 0);

        for (const user of activeUsers) {
            const share = (user.pv / totalCompanyPV) * profitPool;
            if (share > 0) {
                user.walletBalance += share;
                await user.save();

                await IncomeHistory.create({
                    userId: user._id,
                    fromUserId: user._id,
                    amount: share,
                    type: "Profit Sharing",
                    description: "Daily profit sharing bonus"
                });
            }
        }
    } catch (error) {
        console.error("Error calculating profit sharing:", error);
    }
};

/**
 * Update Rank and Reward System
 */
exports.updateRanks = async () => {
    const ranks = [
        { name: "Bronze", pv: 5, reward: 0 },
        { name: "Silver", pv: 25, reward: 1200 },
        { name: "Gold", pv: 50, reward: 2500 },
        { name: "Platinum", pv: 100, reward: 5000 },
        { name: "Star", pv: 200, reward: 10000 },
        { name: "Ruby", pv: 500, reward: 50000 },
        { name: "Sapphire", pv: 1000, reward: 100000 }, // + India Trip (handled manually or in notes)
        { name: "Star Sapphire", pv: 2500, reward: 500000 },
        { name: "Emerald", pv: 6000, reward: 700000 },
        { name: "Diamond", pv: 30000, reward: 1000000 },
        { name: "Double Diamond", pv: 70000, reward: 1500000 },
        { name: "Blue Diamond", pv: 125000, reward: 3000000 },
        { name: "Ambassador", pv: 300000, reward: 10000000 },
        { name: "Crown", pv: 700000, reward: 25000000 },
        { name: "MD", pv: 1500000, reward: 50000000 }
    ];

    try {
        const trees = await BinaryTree.find({});
        for (const tree of trees) {
            const matchedPV = tree.matchedPV;
            const user = await User.findById(tree.userId);
            if (!user) continue;

            let highestRank = null;
            for (const r of ranks) {
                if (matchedPV >= r.pv) {
                    highestRank = r;
                } else {
                    break;
                }
            }

            if (highestRank && user.rank !== highestRank.name) {
                // New rank achieved!
                user.rank = highestRank.name;
                if (highestRank.reward > 0) {
                    user.walletBalance += highestRank.reward;
                    await IncomeHistory.create({
                        userId: user._id,
                        fromUserId: user._id,
                        amount: highestRank.reward,
                        type: "Level", // Or a new "Reward" type
                        description: `Reward for achieving ${highestRank.name} rank`
                    });
                }
                await user.save();
            }
        }
    } catch (error) {
        console.error("Error updating ranks:", error);
    }
};
