const Product = require("../models/Product");

// CREATE PRODUCT WITH IMAGE
exports.createProduct = async (req, res) => {
    try {
        const product = new Product({
            ...req.body,
            image: req.file ? req.file.filename : "",
        });

        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET PRODUCTS
exports.getProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const { search, category } = req.query;

        // Build query
        let query = {};
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        if (category && category !== 'All') {
            if (category === "Beauty & Cosmetics") {
                query.category = { $in: ["Beauty & Cosmetics", "Beauty and cosmetic home based products"] };
            } else {
                query.category = category;
            }
        }

        const [products, total] = await Promise.all([
            Product.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            Product.countDocuments(query)
        ]);

        res.json({
            success: true,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            limit,
            count: products.length,
            products
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
    try {
        const updateData = {
            ...req.body,
        };

        if (req.file) {
            updateData.image = req.file.filename;
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product Deleted" });
};