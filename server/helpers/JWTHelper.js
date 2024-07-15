require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;

class JWTHelper {
    static signToken(payload) {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' }, (err, token) => {
                if (err) reject(err);
                resolve(token);
            });
        });
    }

    static signRefreshToken(payload) {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: '7d' }, (err, refreshToken) => {
                if (err) reject(err);
                resolve(refreshToken);
            });
        });
    }

    static verifyToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, SECRET_KEY, (err, decoded) => {
                if (err) reject(err);
                resolve(decoded);
            });
        });
    }

    static verifyRefreshToken(refreshToken) {
        return new Promise((resolve, reject) => {
            jwt.verify(refreshToken, REFRESH_SECRET_KEY, (err, decoded) => {
                if (err) reject(err);
                resolve(decoded);
            });
        });
    }
}

module.exports = JWTHelper;
