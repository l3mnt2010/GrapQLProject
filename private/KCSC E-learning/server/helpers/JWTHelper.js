require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;

console.log(SECRET_KEY,"có con cẹc", REFRESH_SECRET_KEY);

class JWTHelper {
    static signToken(payload) {
        return jwt.sign(payload, SECRET_KEY, { expiresIn: '2h', algorithm: 'HS256' })
    }

    static signRefreshToken(payload) {
        return jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: '7d', algorithm: 'HS256' })
    }

    static verifyToken(token) {
        return jwt.verify(token, SECRET_KEY)
    }

    static verifyRefreshToken(refreshToken) {
        return jwt.verify(refreshToken, REFRESH_SECRET_KEY)
    }
}

module.exports = JWTHelper;