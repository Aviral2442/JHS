import nodemailer from "nodemailer";
import { emailTemplate } from "../utils/emailTemplate";
require("dotenv").config();
import axios from "axios";

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


// MSG91 API Integration
export const sendSMSService = async (mobile: string) => {
  try {
    const otp = Math.floor(1000 + Math.random() * 9000);

    const response = await axios.post(
      "https://control.msg91.com/api/v5/oneapi/api/flow/jeevan/run",
      {
        data: {
          sendTo: [
            {
              to: [
                {
                  mobiles: `91${String(mobile).trim()}`,
                  variables: {
                    otp: {
                      type: "text",
                      value: otp.toString()
                    },
                    timer: {
                      type: "text",
                      value: "5"
                    }
                  }
                }
              ]
            }
          ]
        }
      },
      {
        headers: {
          "authkey": String(process.env.MSG_AUTH_KEY).trim(),
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      }
    );

    console.log(response.data);

    return {
      status: 200,
      message: "SMS Sent Successfully",
      otp
    };

  } catch (error: any) {
    console.log("ERROR:", error?.response?.data || error.message);

    return {
      status: 500,
      message: "SMS Failed"
    };
  }
};