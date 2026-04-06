const mongoose = require("mongoose");

const RETRY_DELAY_MS = Number(process.env.MONGO_RETRY_DELAY_MS) || 10000;
let isConnecting = false;
let retryTimer = null;

const scheduleRetry = () => {
    if (retryTimer) return;
    retryTimer = setTimeout(() => {
        retryTimer = null;
        connectDB();
    }, RETRY_DELAY_MS);
};

const connectDB = async () => {
    if (mongoose.connection.readyState === 1 || isConnecting) {
        return;
    }

    try {
        isConnecting = true;
        const dbUri = process.env.MONGO_URI || process.env.MONGODB_URI;

        if (!dbUri) {
            console.error("MongoDB connection string (MONGO_URI or MONGODB_URI) is missing in environment variables.");
            isConnecting = false;
            return;
        }

        const conn = await mongoose.connect(dbUri, {
            serverSelectionTimeoutMS: 5000,
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        isConnecting = false;
    } catch (err) {
        console.error("MongoDB connection error:", err.message);
        isConnecting = false;
        console.log(`🔁 Retrying MongoDB connection in ${Math.round(RETRY_DELAY_MS / 1000)}s...`);
        scheduleRetry();
    }
};

mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected.");
    scheduleRetry();
});

mongoose.connection.on("error", (err) => {
    console.error("MongoDB runtime error:", err.message);
});

module.exports = connectDB;
