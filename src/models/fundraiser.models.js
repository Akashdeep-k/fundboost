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
    location: {
        type: String,
        required: true,

    },
    genre: {
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
    photoUrl: {
        type: String,
        default: "http://res.cloudinary.com/duhdg3btj/image/upload/v1699264322/tolia398cdxspwlnjzjn.png"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

fundraiserSchema.methods.toJSON = function () {
    const fundraiserObj = this.toObject();

    delete fundraiserObj.createdAt;
    delete fundraiserObj.updatedAt;
    delete fundraiserObj.__v;

    return fundraiserObj;
}

const Fundraiser = mongoose.model("Fundraiser", fundraiserSchema);

module.exports = Fundraiser;