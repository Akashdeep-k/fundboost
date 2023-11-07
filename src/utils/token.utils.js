const jwt = require("jsonwebtoken");

const generateAccessToken = (id) => {
    return jwt.sign(id, process.env.ACCESS_TOKEN_SECRET);
}

const validateAccessToken = (accessToken) => {
    return jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
}

const generateEmailVerificationToken = (id) => {
    return jwt.sign( id, process.env.EMAIL_VERIFICATION_TOKEN_SECRET);
}

const validateEmailVerificationToken = (emailVerificationToken) => {
    return jwt.verify(emailVerificationToken, process.env.EMAIL_VERIFICATION_TOKEN_SECRET);
}

module.exports = {
    generateAccessToken,
    validateAccessToken,
    generateEmailVerificationToken,
    validateEmailVerificationToken
}