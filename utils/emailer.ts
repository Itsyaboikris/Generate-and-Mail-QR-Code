const nodemailer = require("nodemailer");
require("dotenv").config();

export type EmailParams = {
    email: string;
    message: string;
    subject: string;
};

export type EmailWithAttachmentsParams = {
    email: string;
    message: string;
    subject: string;
    filename: string;
    path: string;
};

export const sendEmail = (params: EmailParams): number => {
    const mailOptions = {
        to: params.email,
        from: process.env.EMAIL,
        subject: params.subject,
        html: `<p> ${params.message} </p>`
    };

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAILPASSWORD // naturally, replace both with your real credentials or an application-specific password
        }
    });

    transporter.sendMail(mailOptions, (error: any, response: any) => {
        if (error) {
            console.log("Error sending email ", error);
            return 1;
        } else {
            console.log("Sent email to ", response);
            return 0;
        }
    });
    return 0;
};

export const sendEmailWithAttachments = (params: EmailWithAttachmentsParams): number => {
    const mailOptions = {
        to: params.email,
        from: process.env.EMAIL,
        subject: params.subject,
        html: `<p> ${params.message} </p>`,
        attachments: [{
            filename : params.filename,
            path: params.path
        }]
    };

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAILPASSWORD?.trim() // naturally, replace both with your real credentials or an application-specific password
        }
    });

    transporter.sendMail(mailOptions, (error: any, response: any) => {
        if (error) {
            console.log("Error sending email ", error);
            return 1;
        } else {
            console.log("Sent email to ", response);
            return 0;
        }
    });
    return 0;
};
