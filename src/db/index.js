const mongoose = require("mongoose");
const { DB_NAME } = require("../constants");

const uri = process.env.MONGODB_URI + DB_NAME + "?retryWrites=true&w=majority";

const connectToDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(uri);
        console.log("Successfully connected to database");
        // console.log(connectionInstance);
    } catch (e) {
        console.log("Error in database connection");
        throw new Error(e);
    }
};

module.exports = connectToDB;