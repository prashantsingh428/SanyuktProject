const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const dbUri = process.env.MONGO_URI || process.env.MONGODB_URI;

        if (!dbUri) {
            throw new Error("MongoDB connection string (MONGO_URI or MONGODB_URI) is missing in environment variables.");
        }

        const conn = await mongoose.connect(dbUri, {
            family: 4,
            serverSelectionTimeoutMS: 5000,
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error("MongoDB connection error:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;