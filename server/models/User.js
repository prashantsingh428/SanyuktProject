const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        sponsorId: {
            type: String,
            // required: true,  // 👈 Comment out ya remove
            trim: true,
        },
        sponsorName: {
            type: String,
            trim: true,
        },
        userName: {
            type: String,
            // required: true,  // 👈 Comment out
            trim: true,
        },
        fatherName: {
            type: String,
            // required: true,  // 👈 Comment out
            trim: true,
        },
        position: {
            type: String,
            enum: ["Left", "Right"],
            // required: true,  // 👈 Comment out
        },
        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
            // required: true,  // 👈 Comment out
        },
        mobile: {
            type: String,
            // required: true,  // 👈 Comment out
            match: [/^\d{10}$/, "Invalid mobile number"],
            // unique: true,    // 👈 Unique bhi hata do temporarily
        },
        email: {
            type: String,
            required: true,     // 👈 SIRF YEH REQUIRED RAKHO
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            // required: true,  // 👈 Comment out (grievance wale users ke liye)
        },
        shippingAddress: {
            type: String,
            // required: true,  // 👈 Comment out
        },
        state: {
            type: String,
            // required: true,  // 👈 Comment out
        },
        district: {
            type: String,
            // required: true,  // 👈 Comment out
        },
        assemblyArea: {
            type: String,
            // required: true,  // 👈 Comment out
        },
        block: {
            type: String,
            // required: true,  // 👈 Comment out
        },
        villageCouncil: {
            type: String,
            // required: true,  // 👈 Comment out
        },
        village: {
            type: String,
            // required: true,  // 👈 Comment out
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        otp: String,
        otpExpire: Date,
        grievances: [
            {
                ticket: String,
                subject: String,
                status: String,
                submittedDate: Date,
                category: String,
                message: String
            }
        ]
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
