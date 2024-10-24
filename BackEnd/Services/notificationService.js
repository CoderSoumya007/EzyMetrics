import nodemailer from 'nodemailer';
import dotenv from "dotenv";

dotenv.config();

class NotificationService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

    }

    async sendAlert(to, subject, text) {
        const mailOptions = {
            from: process.env.SMTP_FROM,
            to,
            subject,
            text,
        };
        console.log("Mail Sent Successfully");
        return this.transporter.sendMail(mailOptions);
    }
}

export default new NotificationService();