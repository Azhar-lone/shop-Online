import { redisClient } from "../../../../app.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

export default async function sendOTP(req, res) {
    try {
        const { email } = req.body;

        // Generate a secure random 6-digit OTP
        const otp = crypto.randomInt(100000, 999999).toString(); // Ensures 6 digits

        // Store OTP in Redis with expiry of 3 minutes
        const done = await redisClient.hSet("user:otp", email, otp);
        redisClient.expire("user:otp", 180); // 180 seconds (3 minutes)

        if (!done) {
            return res.status(401).json({
                msg: "Error while saving OTP. Please try again.",
            });
        }

        // Configure Nodemailer transporter for sending email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_Address,
                pass: process.env.EMAIL_Pass,
            },
           
        });

        // Compose email content with clear instructions
        const mailOptions = {
            from: '"Shop-Online" <your_email@example.com>', // Replace with your app name and email
            to: email,
            subject: "Your One-Time Password (OTP)",
            text: `Your OTP for verification is: ${otp}
      This code is valid for 3 minutes only. Please do not share it with anyone.`,
        };

        // Send email using Nodemailer
        const info = await transporter.sendMail(mailOptions);

        return res.status(200).json({
            msg: "OTP sent successfully. Please check your email.",
        });
    } catch (error) {
        console.error("Error sending OTP:", error);
        return res.status(500).json({
            msg: "Internal server error. Please try again later.",
        });
    }
}
