import nodemailer from "nodemailer";
import { emailTemplate } from "../utils/emailTemplate";
require("dotenv").config();

export const sendMailService = async ({
  to,
  subject,
  headerTitle,
  bodyContent,
  footerContent,
  buttonText,
  buttonLink,
}: any) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL, // Your Gmail address
        pass: process.env.MAIL_PASS, // Use app password
      },
    });

    const html = emailTemplate({
      headerTitle,
      bodyContent,
      footerContent,
      buttonText,
      buttonLink,
    });

    await transporter.sendMail({
      from: `"Jeevan Home Services" <${process.env.MAIL}>`,
      to,
      subject,
      html,
    });

    return { 
        status: 200, 
        message: "Mail Sent Successfully"
    };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Mail Failed" };
  }
};
