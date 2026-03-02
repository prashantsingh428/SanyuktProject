const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    sponsorId: String,
    sponsorName: String,
    position: { type: String, enum: ["Left", "Right"] },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    mobile: String,
    email: { type: String, unique: true },
    shippingAddress: String,
    state: String,
    city: String,
    password: String,

    role: { type: String, default: "user" },

    otp: String,
    otpExpire: Date,
    isVerified: { type: Boolean, default: false }

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);