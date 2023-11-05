const jwt = require("jsonwebtoken");
const secret = process.env.REFRESH_TOKEN_SECRET;

const generateRefreshToken = (id) => {
    return jwt.sign(id, secret, { expiresIn: '30d' });
}

const validateRefreshToken = (refreshToken) => {
    const id = jwt.verify(refreshToken, secret);
    return id;
}

module.exports = {
    generateRefreshToken,
    validateRefreshToken
}