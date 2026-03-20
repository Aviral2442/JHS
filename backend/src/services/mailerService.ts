import nodemailer from "nodemailer";
import { emailTemplate } from "../utils/emailTemplate";
require("dotenv").config();
import axios from "axios";



// MSG91 API Integration and nodemailer for sending OTP via email or SMS based on the input type (email or mobile number)
export const sendSMSService = async (emailOrMobile: string) => {
  try {
    const otp = Math.floor(1000 + Math.random() * 9000);

    const isEmail = emailOrMobile.includes("@");
    console.log("isEmail:", isEmail);
    let Mobile = null;

    if (isEmail) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.MAIL, // Your Gmail address
          pass: process.env.MAIL_PASS, // Use app password
        },
      });

      const html = emailTemplate({
        otp,
        timer: 5
      });

      await transporter.sendMail({
        from: `"Jeevan Home Services" <${process.env.MAIL}>`,
        to: emailOrMobile,
        subject: "Your OTP for Jeevan Home Services",
        html,
      });
    } else {
      Mobile = emailOrMobile;

      const response = await axios.post(
        "https://control.msg91.com/api/v5/oneapi/api/flow/jeevan/run",
        {
          data: {
            sendTo: [
              {
                to: [
                  {
                    mobiles: `91${String(Mobile).trim()}`,
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
    }

    return {
      status: 200,
      message: "SMS Sent Successfully",
      jsonData: {
        otp,
      }
    };

  } catch (error: any) {
    console.log("ERROR:", error?.response?.data || error.message);

    return {
      status: 500,
      message: "SMS Failed"
    };
  }
};