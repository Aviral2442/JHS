import db_Config from "../../config/db_Config";
import { currentUnixTimeStamp } from "../../utils/CurrentUnixTimeStamp";

// ADD REMARK SERVICE
export const addRemarkService = async (remarkData: any) => {
    try {

        const insertData = {
            remarks_type: remarkData.remarks_type,
            remarks_added_by: remarkData.remarks_added_by,
            remarks_text: remarkData.remarks_text,
            remarks_createdAt: currentUnixTimeStamp(),
        }

        const [result]: any = await db_Config.query(
            `INSERT INTO remarks SET ?`,
            [insertData]
        );

        return {
            status: 200,
            message: "Remark added successfully",
            jsonData: {
                remark_id: result.insertId
            }
        };

    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "Internal Server Error",
            jsonData: {}
        }
    }
};