import db_Config from "../../config/db_Config";
import { saveBase64File } from "../../middleware/base64FileUpload";

export const fetchWebsiteDataService = async () => {
    try {

        const [result]: any = await db_Config.query(
            `SELECT * FROM setting`
        );

        return {
            status: 200,
            message: "Successfully Website Data fetched!!",
            jsonData: {
                websiteData: result[0] || {}
            }
        }

    } catch (error) {
        console.error(error);
        return {
            status: 500,
            message: "Internal Server Error" + error,
            jsonData: {}
        }
    }
};

export const updateWebsiteDataService = async (data: any) => {
    try {

        const updateData: any = {};

        if (data.company_logo) updateData.company_logo = saveBase64File(
            data.company_logo,
            "websiteData",
            "company_logo"
        );
        if (data.company_mobile_no1) updateData.company_mobile_no1 = data.company_mobile_no1;
        if (data.company_mobile_no2) updateData.company_mobile_no2 = data.company_mobile_no2;
        if (data.company_email1) updateData.company_email1 = data.company_email1;
        if (data.company_email2) updateData.company_email2 = data.company_email2;
        if (data.company_address) updateData.company_address = data.company_address;
        if (data.company_insta_link) updateData.company_insta_link = data.company_insta_link;
        if (data.company_facebook_link) updateData.company_facebook_link = data.company_facebook_link;
        if (data.company_whatsapp_link) updateData.company_whatsapp_link = data.company_whatsapp_link;
        if (data.company_google_map_key) updateData.company_google_map_key = data.company_google_map_key;
        if (data.booking_advance_payment) updateData.booking_advance_payment = data.booking_advance_payment;

        console.log("Update Data:", updateData);

        const [result]: any = await db_Config.query(
            `UPDATE setting SET ?`,
            [updateData]
        );

        console.log("DB Result:", result);

        return {
            status: 200,
            message: "Successfully Updated!!",
        }

    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "Internal Server Error" + error,
            jsonData: {}
        }
    }
};