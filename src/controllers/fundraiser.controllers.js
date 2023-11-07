const asyncHandler = require("express-async-handler");
const Fundraiser = require("../models/fundraiser.models");
const cloudinary = require("../utils/cloudinary.utils");
const fs = require("fs");

const createFundraiser = asyncHandler(async (req, res) => {
    req.body.userId = req.user._id;

    const photo = req.files?.photo;
    if (photo) {
        try {
            const result = await cloudinary.v2.uploader.upload(photo.tempFilePath);
            req.body.photoUrl = result.url;
            fs.unlinkSync(photo.tempFilePath);
        } catch (e) {
            res.status(500);
            throw new Error("Can't upload image", e);
        }
    }
    const newFundraiser = await Fundraiser.create(req.body);
    res.json(newFundraiser);
});

const updateFundraiser = asyncHandler(async (req, res) => {
    const { fundraiserId } = req.params;
    const fundraiser = await Fundraiser.findById(fundraiserId);
    if (!fundraiser) {
        res.status(400);
        throw new Error("No fundraiser found");
    }

    const photo = req.files?.photo;
    if (photo) {
        try {
            const result = await cloudinary.v2.uploader.upload(photo.tempFilePath);
            req.body.photoUrl = result.url;
        } catch (e) {
            res.status(500);
            throw new Error("Can't upload image", e);
        }
    }

    const updateFields = Object.keys(req.body);

    updateFields.forEach((update) => {
        fundraiser[update] = req.body[update];
    });

    res.json(fundraiser);
});

const getFundraiser = asyncHandler(async (req, res) => {
    const { fundraiserId } = req.params;
    const fundraiser = await Fundraiser.findById(fundraiserId);
    if (!fundraiser) {
        res.status(400);
        throw new Error("No fundraiser found");
    }
    res.json(fundraiser);
});

const getAllFundraisers = asyncHandler(async (req, res) => {
    // const filterObj = {...req.query};
    // const excludeFromFilter = ['sort', 'fields', 'page', 'limit'];
    // excludeFromFilter.forEach((query) => {

    // })

    const fundraisers = await Fundraiser.find();
    res.json(fundraisers);
});

const getOnlyYourFundraisers = asyncHandler(async (req, res) => {
    const fundraisers = await Fundraiser.find({userId: req.user._id});
    res.json(fundraisers);
})

const deleteFundraiser = asyncHandler(async (req, res) => {
    const { fundraiserId } = req.params;
    const fundraiser = await Fundraiser.findByIdAndDelete(fundraiserId);
    if (!fundraiser) {
        res.status(400);
        throw new Error("No fundraiser found");
    }
    res.send("Fundraiser deleted successfully");
});

module.exports = {
    createFundraiser,
    updateFundraiser,
    getAllFundraisers,
    getOnlyYourFundraisers,
    getFundraiser,
    deleteFundraiser
}