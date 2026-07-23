const redis = require('redis');

let redisClient;

const connectRedis = async () => {
    try {
        redisClient = redis.createClient({
            url: process.env.REDIS_URI || 'redis://127.0.0.1:6379'
        });

        redisClient.on('error', (err) => console.error('[Redis] Client Error:', err));
        redisClient.on('connect', () => console.log('[Redis] Connected successfully'));

        await redisClient.connect();
    } catch (err) {
        console.error('[Redis] Connection Failed:', err.message);
    }
};

const getRedisClient = () => {
    if (!redisClient) {
        throw new Error('Redis client is not initialized');
    }
    return redisClient;
};

module.exports = { connectRedis, getRedisClient };
