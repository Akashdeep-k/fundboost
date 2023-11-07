const asyncHandler = require("express-async-handler");
const User = require("../models/user.models");
const jwt = require("jsonwebtoken");

const { generateAccessToken, generateEmailVerificationToken, validateEmailVerificationToken } = require("../utils/token.utils");
const { sendVerificationEmail, sendPasswordResetEmail } = require("../utils/email.utils");

const signup = asyncHandler(async (req, res) => {
    req.body.isAdmin = false;
    const newUser = await User.create(req.body);

    const token = generateEmailVerificationToken(newUser._id.toString());
    sendVerificationEmail(newUser.firstname, newUser.email, token);

    res.json(newUser);
});

const emailVerify = asyncHandler(async (req, res) => {
    const token = req.query.token;

    const id = validateEmailVerificationToken(token);
    const user = await User.findById(id);
    user.isEmailVerified = true;
    await user.save();

    res.send("Email address verified");
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        res.status(401);
        throw new Error("User with specified email address doesn't exist");
    }

    if (user && await user.isPasswordMatch(password)) {
        const token = generateAccessToken(user._id.toString());
        user.tokens = user.tokens.concat({ token });
        await user.save();
        res.json({ user, token });
    }
    else {
        res.status(401);
        throw new Error("The password you provided is incorrect");
    }
});

const logout = asyncHandler(async (req, res) => {
    req.user.tokens = req.user.tokens.filter((token) => {
        return token.token !== req.token
    });
    await req.user.save();
    res.send("Logged out successfully");
});

const updatePassword = asyncHandler(async (req, res) => {
    req.user.password = req.body.password;
    await req.user.save();
    res.json(req.user);
});

const updateUser = asyncHandler(async (req, res) => {
    const updateFields = Object.keys(req.body);

    updateFields.forEach((update) => {
        req.user[update] = req.body[update];
    });
    if (req.user.isModified("isAdmin")) {
        req.user.isAdmin = false;
    }
    if (req.user.isModified("email")) {
        req.user.isEmailVerified = false;
        await req.user.save();
        const token = generateEmailVerificationToken(req.user._id.toString());
        console.log(token);
        sendVerificationEmail(req.user.firstname, req.user.email, token);
    }

    res.json(req.user);
});

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        res.status(400);
        throw new Error("Please enter a valid email address");
    }

    const RESET_TOKEN_SECRET = process.env.RESET_PASSWORD_SECRET + user.password
    const resetToken = jwt.sign({ email }, RESET_TOKEN_SECRET, { expiresIn: '10m' });

    sendPasswordResetEmail(user.firstname, user._id, email, resetToken);
    res.send("An email is sent with reset password link to your registered email");
});

const resetPassword = asyncHandler(async (req, res) => {
    const { id, token } = req.params
    const { newPassword } = req.body
    try {
        const user = await User.findById(id)
        if (!user) {
            res.status(400)
            throw new Error("User doesn't exists")
        }

        const RESET_TOKEN_SECRET = process.env.RESET_PASSWORD_SECRET + user.password
        const emailObj = jwt.verify(token, RESET_TOKEN_SECRET);
        const userEmail = await User.findOne({ email: emailObj.email });
        if (!userEmail) {
            res.status(400);
            throw new Error("This url doesn't exists");
        }

        user.password = newPassword
        await user.save()
        res.send("Password reset successfully")

    } catch (e) {
        throw new Error(e)
    }
});

const getYourProfile = asyncHandler(async (req, res) => {
    res.json(req.user);
})

module.exports = {
    signup,
    emailVerify,
    login,
    logout,
    updatePassword,
    updateUser,
    forgotPassword,
    resetPassword,
    getYourProfile
}