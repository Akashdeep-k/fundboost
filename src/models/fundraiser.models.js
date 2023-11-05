const mongoose = require("mongoose");

const fundraiserSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    },
    story: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    },
    funraiserReason: {
        type: String,
        required: true,
        enum: ["Medical", "Travel", "Education", "Sports", "Family", "Emergencies", "Other"]
    },
    forWhom: {
        type: String,
        required: true,
        enum: ["Yourself", "Someone else", "Charity"]
    },
    initialTarget: {
        type: Number,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

const Fundraiser = mongoose.model("Fundraiser", fundraiserSchema);

module.exports = Fundraiser;