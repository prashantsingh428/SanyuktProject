const express = require('express');
const router = express.Router();
const { triggerLeak, getMemoryUsage, clearLeak } = require('../controllers/debugController');

// Memory Leak Demonstration Routes
// Intentionally left unprotected for easy access during interviews/demonstrations
router.get('/memory', getMemoryUsage);
router.get('/leak', triggerLeak);
router.get('/clear-leak', clearLeak);

module.exports = router;
