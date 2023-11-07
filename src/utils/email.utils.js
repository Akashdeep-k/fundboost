const nodemailer = require("nodemailer");
const { API_VERSION } = require("../constants");

const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD
    }
});

const sendVerificationEmail = (firstname, email, token) => {
    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: email,
        subject: "Fundboost: Email Verification link",
        html: `
                <p>Dear ${firstname},</p>
                <p><a href="http://localhost:3000${API_VERSION}/user/verify?token=${token}">Click here</a>
                to verify your email address.
                </P>
                `
    }
    transporter.sendMail(mailOptions).then(() => {
        console.log("Verification email sent");
    }).catch(e => {
        console.log("Error occured while sending email");
    });
}

const sendPasswordResetEmail = (firstname, id, email, token) => {
    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: email,
        subject: "Fundboost: Reset password link",
        html: `
            <p>Dear ${firstname},</p>
            <p>Click on the link to reset your password. The link is valid only for 10 minutes.</p>
            <a href="http://localhost:3000${API_VERSION}/user/reset-password/${id}/${token}">Click here</a>`
    }
    transporter.sendMail(mailOptions).then(() => {
        console.log("Password reset email sent");
    }).catch(e => {
        console.log("Error occured while sending email");
    });
}

module.exports = { sendVerificationEmail, sendPasswordResetEmail };