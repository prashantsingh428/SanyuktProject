const mongoose = require('mongoose');
const User = require('./server/models/User');
const IncomeHistory = require('./server/models/IncomeHistory');
const { findExtremePosition, distributeLevelIncome, distributeDirectIncome, updateTeamPV } = require('./server/utils/mlmUtils');

// Mock data and connection for testing
const MONGODB_URI = "mongodb+srv://sprle01:sprle0101@cluster0.e8p6s.mongodb.net/rd_management?retryWrites=true&w=majority";

async function testMLM() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB");

        // 1. Create a root user if not exists
        let root = await User.findOne({ memberId: 'ROOT001' });
        if (!root) {
            root = await User.create({
                userName: 'Root User',
                email: 'root@example.com',
                password: 'password123',
                memberId: 'ROOT001',
                activeStatus: true,
                isVerified: true,
                packageType: '₹2699',
                pv: 1,
                bv: 1000
            });
            console.log("Created Root User");
        }

        // 2. Simulate new user registration under root
        console.log("Simulating registration of User A under ROOT001 (Left)...");
        const placement = await findExtremePosition('ROOT001', 'Left');
        console.log("Placement found:", placement);

        const userA = await User.create({
            userName: 'User A',
            email: `usera_${Date.now()}@example.com`,
            password: 'password123',
            memberId: `SPRL${Math.floor(1000 + Math.random() * 9000)}`,
            sponsorId: 'ROOT001',
            parentId: placement.parentId,
            position: placement.position,
            packageType: '₹1299',
            pv: 0.5,
            bv: 500,
            activeStatus: true,
            isVerified: true
        });

        // Update parent
        const parent = await User.findById(placement.parentId);
        if (placement.position === 'Left') parent.left = userA._id;
        else parent.right = userA._id;
        await parent.save();

        console.log("User A created. Distributing income...");
        await distributeDirectIncome(userA);
        await distributeLevelIncome(userA);
        await updateTeamPV(userA);

        // 3. Verify income for ROOT001
        const updatedRoot = await User.findOne({ memberId: 'ROOT001' });
        console.log("Root Wallet Balance:", updatedRoot.walletBalance);
        console.log("Root Left Team PV:", updatedRoot.leftTeamPV);
        console.log("Root Right Team PV:", updatedRoot.rightTeamPV);

        const incomes = await IncomeHistory.find({ userId: root._id });
        console.log("Incomes generated for Root:", incomes.length);
        incomes.forEach(inc => console.log(`- ${inc.type}: ₹${inc.amount} (${inc.description})`));

        console.log("Test completed successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Test failed:", error);
        process.exit(1);
    }
}

testMLM();
