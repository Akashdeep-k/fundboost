const express = require("express");

const { auth } = require("../middlewares/authentication");

const {
    createFundraiser,
    updateFundraiser,
    getAllFundraisers,
    getOnlyYourFundraisers,
    getFundraiser,
    deleteFundraiser
} = require("../controllers/fundraiser.controllers");

const router = express.Router();

router.post("/", auth(), createFundraiser);
router.patch("/:fundraiserId", auth(), updateFundraiser);
router.get("/all", getAllFundraisers);
router.get("/", auth(), getOnlyYourFundraisers);
router.get("/:fundraiserId", getFundraiser);
router.delete("/:fundraiserId",auth(), deleteFundraiser);

module.exports = router;