import dbConfig from "../../config/db_Config";
import { currentUnixTimeStamp } from "../../utils/CurrentUnixTimeStamp";


// ADD CONTACT US SERVICE
export const contactUsService = async (data: any) => {
    try {
        const insertData = {
            wcf_name: data.wcf_name,
            wcf_phone: data.wcf_phone,
            wcf_email: data.wcf_email,
            wcf_subject: data.wcf_subject,
            wcf_message: data.wcf_message,
            wcf_created_at: currentUnixTimeStamp(),
        }

        const [result]: any = await dbConfig.query(
            `INSERT INTO websiteContactForm SE ?`,
            [insertData]
        );

        return {
            status: 200,
            message: "Contact form submitted successfully",
            jsonData: {}
        }
    } catch (error: any) {
        console.error("Error in contactUsService:", error);
        return {
            status: 500,
            message: "An error occurred while submitting the contact form, " + error.message,
            jsonData: {},
        }
    }
};