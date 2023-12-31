require("dotenv").config();
const { API_VERSION, PORT } = require("./constants.js");

const express = require("express");
const connectToDB = require("./db/index.js");

const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const { notFoundError, responseError } = require("./middlewares/error.js");
const { auth, checkAuth } = require("./middlewares/authentication.js");

const userRouter = require("./routes/user.routes.js");
const fundraiserRouter = require("./routes/fundraiser.routes.js");

; (async () => {
    try {
        await connectToDB();
        const app = express();

        app.use(cors()); // Allows cross-origin resource sharing
        app.use(morgan("dev")); // Logs incoming HTTP requests
        app.use(cookieParser()); // Parse cookies in incoming requests
        app.use(fileUpload({ useTempFiles: true })); // Handle file uploads, storing files in temporary files
        app.use(express.json()); // Parse incoming JSON data in request bodies
        app.use(express.urlencoded({ extended: false })); // Parse incoming URL-encoded data in request bodies
        app.use(checkAuth()); // Checks if a user is authenticated

        app.use(`${API_VERSION}/user`, userRouter);
        app.use(`${API_VERSION}/fundraiser`, fundraiserRouter);

        app.use(notFoundError); // Handles invalid URLs by generating a 404 error.
        app.use(responseError); // Handles and responds with error details.

        app.listen(PORT, () => {
            console.log(`Server successfully running on port ${PORT}...`);
        });
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
})();