const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: String,
        price: Number,
        oldPrice: Number,
        bv: Number,
        stock: Number,
        image: String,
        description: String,

        // ⭐ NEW FIELDS
        rating: {
            type: Number,
            default: 0,
        },
        numReviews: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);