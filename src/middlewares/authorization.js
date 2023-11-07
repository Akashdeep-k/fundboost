const asyncHandler = require("express-async-handler");

const admin = () => {
    return asyncHandler(async (req, res, next) => {
        if (req.user.role) next();
        else {
            res.status(403);
            throw new Error("Only admin can access these resources");
        }
    });
};

module.exports = { admin };