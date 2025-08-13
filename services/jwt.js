const jwt = require('jsonwebtoken');
// const { getCache, setCache } = require('./cache');

const JWT_SECRET = process.env.JWT_SECRET

const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';


const generateToken = async (user) => {
    // const cacheKey = `token:${user._id}`;
    // const cachedToken = await getCache(cacheKey);
    // if (cachedToken) {
    //     return cachedToken;
    // }
    const exp = Math.floor(Date.now() / 1000) + (JWT_EXPIRATION === '1h' ? 3600 : 86400);
    const token = jwt.sign({ ...user, exp }, JWT_SECRET);
    // setCache(cacheKey, token, exp);
    return token;
}

const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid token');
    }
}


module.exports = {
    generateToken,
    verifyToken
};