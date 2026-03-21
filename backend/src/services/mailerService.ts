import nodemailer from "nodemailer";
import { emailTemplate } from "../utils/emailTemplate";
require("dotenv").config();
import axios from "axios";
import db from "../config/db_Config";
import { send } from "process";

// MOBILE AND EMAIL OTP SERVICE
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
          user: process.env.MAIL,
          pass: process.env.MAIL_PASS,
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

// MOBILE OTP SERVICE
export const sendOTPService = async (requestOTPOn: any) => {
  try {

    const reqOnMobile = requestOTPOn.reqWithMobile || 0;
    const reqOnEmail = requestOTPOn.reqWithEmail || 0;
    const reqOnBoth = requestOTPOn.reqWithBothEmailAndMobile || 0;

    const generateOTP = Math.floor(1000 + Math.random() * 9000);

    if (reqOnMobile != 0 && reqOnMobile != null) {

      await sendOTPToMobile(reqOnMobile, generateOTP);

      return {
        status: 200,
        message: "OTP Sent Successfully on Mobile",
        jsonData: {}
      };

    } else if (reqOnEmail != 0 && reqOnEmail != null) {

      await sendToEmail(reqOnEmail, generateOTP);

      return {
        status: 200,
        message: "OTP Sent Successfully on Email",
        jsonData: {}
      };

    } else if (reqOnBoth != 0 && reqOnBoth != null) {

      const checkMobileOrEmail = reqOnBoth.includes("@") ? "email" : "mobile";
      let senderMobileNo, senderEmailId;

      if (checkMobileOrEmail === "email") {

        senderEmailId = reqOnBoth;
        const [rows] = await db.query(
          "SELECT consumer_mobile from consumer WHERE consumer_email = ?",
          [senderEmailId]
        )

        if (rows.length > 0) {
          await sendOTPToMobile(rows[0].consumer_mobile, generateOTP);
        }

        await sendToEmail(senderEmailId, generateOTP);

        return {
          status: 200,
          message: "OTP Sent Successfully on Both Mobile and Email",
          jsonData: {}
        };

      } else if (checkMobileOrEmail === "mobile") {

        senderMobileNo = reqOnBoth;
        const [rows] = await db.query(
          "SELECT consumer_email from consumer WHERE consumer_mobile = ?",
          [senderMobileNo]
        )

        if (rows.length > 0) {
          await sendToEmail(rows[0].consumer_email, generateOTP);
        }

        await sendOTPToMobile(senderMobileNo, generateOTP);

        return {
          status: 200,
          message: "OTP Sent Successfully on Both Mobile and Email",
          jsonData: {}
        };

      } else {
        return {
          status: 400,
          message: "Invalid Request",
          jsonData: {}
        }
      }

    } else {
      return {
        status: 400,
        message: "Invalid Request",
        jsonData: {}
      }
    }

    // Function to send OTP to mobile number
    async function sendOTPToMobile(mobileNumber: number, otp: number) {

      const checkConfirmMobile = String(mobileNumber).trim().length === 10;

      if (!checkConfirmMobile) {
        return {
          status: 400,
          message: "Invalid Mobile Number",
          jsonData: {}
        }
      }

      const response = await axios.post(
        "https://control.msg91.com/api/v5/oneapi/api/flow/jeevan/run",
        {
          data: {
            sendTo: [
              {
                to: [
                  {
                    mobiles: `91${String(mobileNumber).trim()}`,
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
      )
    }

    // Function to send OTP to email
    async function sendToEmail(email: string, otp: number) {
      const checkConfirmEmail = email.includes("@");

      if (!checkConfirmEmail) {
        return {
          status: 400,
          message: "Invalid Email Address",
          jsonData: {}
        }
      }

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.MAIL,
          pass: process.env.MAIL_PASS,
        },
      });

      const html = emailTemplate({
        otp,
        timer: 5
      });

      await transporter.sendMail({
        from: `"Jeevan Home Services" <${process.env.MAIL}>`,
        to: email,
        subject: "Your OTP for Jeevan Home Services",
        html,
      });

    }

  } catch (error) {

    return {
      status: 500,
      message: "Failed to send OTP",
      jsonData: {}
    }

  }
};