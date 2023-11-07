const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: "Invalid email address"
        }
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        validate: {
            validator: function (value) {
                return !value.toLowerCase().includes("password");
            },
            message: `Password should not contain "password"`
        }
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

userSchema.methods.isPasswordMatch = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    
    delete userObject.password;
    delete userObject.__v;
    delete userObject.createdAt;
    delete userObject.updatedAt;
    delete userObject.tokens;

    return userObject;
}

const User = mongoose.model("User", userSchema);
module.exports = User;