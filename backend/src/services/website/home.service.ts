import dbConfig from "../../config/db_Config";
import { currentUnixTimeStamp } from "../../utils/CurrentUnixTimeStamp";


// ADD CONTACT US SERVICE
export const contactUsService = async (data: any) => {
    try {
        const insertData = {
            contactForm_name: data.wcf_name,
            contactForm_mobile: data.wcf_phone,
            contactForm_email: data.wcf_email,
            contactForm_subject: data.wcf_subject,
            contactForm_message: data.wcf_message,
            contactForm_createdAt: currentUnixTimeStamp(),
        }

        const [result]: any = await dbConfig.query(
            `INSERT INTO contact_form SET ?`,
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

//GET STATE LIST SERVICE
export const getStateListService = async () => {
    try {
        const [result]: any = await dbConfig.query(
            `SELECT state_id, state_name FROM state`
        );
        
        return {
            status: 200,
            message: "State list fetched successfully",
            jsonData: {
                states: result
            }
        }
    } catch (error: any) {
        console.error("Error in getStateListService:", error);
        return {
            status: 500,
            message: "An error occurred while fetching the state list, " + error.message,
            jsonData: {},
        }
    }
};

// GET CITY LIST SEARCH SERVICE
export const getCityListService = async (search: string) => {
    try {

        const likeSearchTerm = `%${search.trim()}%`

        const [result]: any = await dbConfig.query(
            `SELECT 
                city_id, 
                city_name 
            FROM city 
            WHERE city_name LIKE ?
            ORDER BY city_name ASC
            LIMIT 50`,
            [likeSearchTerm]
        );

        return {
            status: 200,
            message: "City list fetched successfully",
            jsonData: {
                cities: result
            }
        }
    } catch (error: any) {
        console.error("Error in getCityListService:", error);
        return {
            status: 500,
            message: "An error occurred while fetching the city list, " + error.message,
            jsonData: {},
        }
    }
};
