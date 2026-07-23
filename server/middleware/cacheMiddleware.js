const { getRedisClient } = require('../config/redisClient');

const cache = (duration = 300) => {
    return async (req, res, next) => {
        // Only cache GET requests
        if (req.method !== 'GET') {
            return next();
        }

        try {
            const client = getRedisClient();
            const key = `cache:${req.originalUrl}`;
            
            const cachedResponse = await client.get(key);

            if (cachedResponse) {
                console.log(`[Cache] HIT ${req.originalUrl}`);
                return res.json(JSON.parse(cachedResponse));
            } else {
                console.log(`[Cache] MISS ${req.originalUrl}`);
                
                // Override res.json to capture response
                const originalJson = res.json.bind(res);
                res.json = (body) => {
                    // Save to Redis and set expiration
                    client.setEx(key, duration, JSON.stringify(body))
                        .catch(err => console.error('[Cache] Save Error:', err));
                    
                    // Send response
                    originalJson(body);
                };
                
                next();
            }
        } catch (err) {
            console.error('[Cache] Error:', err.message);
            // Fallback to normal flow if Redis is down
            next();
        }
    };
};

const clearCache = async (pattern) => {
    try {
        const client = getRedisClient();
        const keys = await client.keys(pattern);
        if (keys.length > 0) {
            await client.del(keys);
            console.log(`[Cache] Cleared keys matching: ${pattern}`);
        }
    } catch (err) {
        console.error('[Cache] Clear Error:', err.message);
    }
};

module.exports = { cache, clearCache };
