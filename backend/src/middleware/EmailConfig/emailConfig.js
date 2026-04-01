import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";



export const transporter = nodemailer.createTransport({
  host: process.env.EMAILHOST,
  port: Number(process.env.EMAILPORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});