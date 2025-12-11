const jwt = require('jsonwebtoken');

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'access_secret_key';

function signAccessToken(payload, expiresIn = process.env.JWT_ACCESS_TTL || '1h') {
    return jwt.sign(payload, ACCESS_SECRET, { expiresIn });
}

function verifyAccessToken(token) {
    return jwt.verify(token, ACCESS_SECRET);
}

module.exports = { signAccessToken, verifyAccessToken };
