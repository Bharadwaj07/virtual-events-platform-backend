const redisClient = require('../clients/redis');


// ttl in seconds
const setCache = async (key, value, ttl) => {
    try {
        await redisClient.set(key, JSON.stringify(value), {
            EX: ttl
        });
    } catch (error) {
        console.error('Error setting cache:', error);
        throw new Error('Error setting cache');
    }
}

const getCache = async (key) => {
    try {
        const data = await redisClient.get(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error getting cache:', error);
        throw new Error('Error getting cache');
    }
}

const deleleCache = async (key) => {
    try {
        await redisClient.del(key);
    } catch (error) {
        console.error('Error deleting cache:', error);
        throw new Error('Error deleting cache');
    }
}

const clearCache = async () => {
    try {
        const keys = await redisClient.keys('*');
        if (keys.length > 0) {
            await redisClient.del(keys);
        }
    } catch (error) {
        console.error('Error clearing cache:', error);
        throw new Error('Error clearing cache');
    }
}


module.exports = {
    setCache,
    getCache,
    deleleCache,
    clearCache
};