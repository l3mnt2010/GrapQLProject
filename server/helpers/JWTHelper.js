const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your_secret_key';  // Thay đổi thành key bí mật của bạn

class JWTHelper {
    static sign(payload) {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }, (err, token) => {
                if (err) reject(err);
                resolve(token);
            });
        });
    }

    static verify(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, SECRET_KEY, (err, decoded) => {
                if (err) reject(err);
                resolve(decoded);
            });
        });
    }
}

module.exports = JWTHelper;
