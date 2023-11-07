const User = require("../models/user.models.js")
const asyncHandler = require("express-async-handler");
const { validateAccessToken } = require("../utils/token.utils.js");

const auth = () => {
    return asyncHandler(async (req, res, next) => {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            res.status(401);
            throw new Error("Client is currently logged out");
        }

        const userId = validateAccessToken(token);
        const user = await User.findOne({_id: userId, 'tokens.token': token});
        if (!user) {
            res.status(401);
            throw new Error("Invalid access token");
        }
        req.token = token;
        req.user = user;
        next();
    });
};

const checkAuth = () => {
    return async (req, res, next) => {
        const accessToken = req.header("Authorization")?.replace("Bearer ", "");
        if (!accessToken) return next();

        try {
            const userId = validateAccessToken(accessToken);
            const user = await User.findById({_id: userId, 'tokens.token': accessToken});
            req.token = token;
            req.user = user;
            next();
        } catch (error) {
            next();
        }
    }
}

module.exports = {
    auth,
    checkAuth
}