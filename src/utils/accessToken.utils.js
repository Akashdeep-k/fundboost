const jwt = require("jsonwebtoken");
const secret = process.env.ACCESS_TOKEN_SECRET;

const generateAccessToken = (id) => {
    return jwt.sign(id, secret, { expiresIn: '1h' });
}

const validateAccessToken = (accessToken) => {
    const id = jwt.verify(accessToken, secret);
    return id;
}

module.exports = {
    generateAccessToken,
    validateAccessToken
}