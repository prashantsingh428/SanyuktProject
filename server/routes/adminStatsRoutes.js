const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const {
    getUserStats,
    getProductStats,
    getOrderStats,
    getRecentActivity
} = require('../controllers/adminStatsController');
const { cache } = require('../middleware/cacheMiddleware');

// All routes protected and admin-only
router.use(protect, adminOnly);

router.get('/stats/users', cache(300), getUserStats);
router.get('/stats/products', cache(300), getProductStats);
router.get('/stats/orders', cache(300), getOrderStats);
router.get('/activity/recent', cache(300), getRecentActivity);

module.exports = router;
