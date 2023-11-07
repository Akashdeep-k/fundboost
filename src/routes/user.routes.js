const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares/authentication");

const {
    signup,
    emailVerify,
    login,
    logout,
    updatePassword,
    updateUser,
    forgotPassword,
    resetPassword,
    getYourProfile
} = require("../controllers/user.controllers");

router.post("/signup", signup);
router.get("/verify", emailVerify);
router.post("/login", login);
router.post("/logout", auth(), logout);
router.patch("/update-password", auth(), updatePassword);
router.patch("/update", auth(), updateUser);
router.post("/forgot-password", forgotPassword);
router.patch("/reset-password/:id/:token", resetPassword);
router.get("/profile", auth(), getYourProfile);

module.exports = router;