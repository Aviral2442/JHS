import dbConfig from "../config/db_Config";
import { currentUnixTimeStamp } from "../utils/CurrentUnixTimeStamp";
import bcrypt from "bcryptjs";
import { ApiError } from "../utils/ApiError";
import { saveBase64File } from "../middleware/base64FileUpload";

interface AdminRegisterData {
    admin_name: string;
    admin_email: string;
    admin_password: string;
}

// ADMIN REGISTRATION SERVICE
export const adminRegisterService = async (data: any) => {
    try {
        const insertData = {
            name: data.admin_name,
            profilePic: "",
            adminEmail: data.admin_email,
            adminPassword: await bcrypt.hash(data.admin_password, 10),
            adminStatus: 0,
            adminCreatedAt: currentUnixTimeStamp(),
        }

        // Only process image if profilePic data is provided
        if (data.profilePic && data.profilePic.trim() !== "") {
            const imagePath = saveBase64File(
                data.profilePic,
                "admin",
                "admin_profile",
                data.extension
            );
            insertData.profilePic = imagePath;
        }

        const [result] = await dbConfig.execute(
            `INSERT INTO adminUser SET ?`,
            [insertData]
        );

        return {
            status: 200,
            message: "Admin registered successfully",
            data: result,
        }

    } catch (error) {
        console.log("Admin Registration Error:", error);
        throw new ApiError(500, `Admin Registration Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
};

