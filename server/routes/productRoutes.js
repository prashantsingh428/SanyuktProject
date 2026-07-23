const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
} = require("../controllers/productController");
const { cache, clearCache } = require('../middleware/cacheMiddleware');

// Middleware to clear product cache on modification
const clearProductCache = async (req, res, next) => {
    // wait for the actual request to complete
    res.on('finish', async () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            await clearCache('cache:/api/products*');
        }
    });
    next();
};

router.post("/", upload.single("image"), clearProductCache, createProduct);
router.get("/", cache(300), getProducts);
router.put("/:id", upload.single("image"), clearProductCache, updateProduct);
router.delete("/:id", clearProductCache, deleteProduct);

module.exports = router;