import dbConfig from "../config/db_Config";
import bcrypt from "bcryptjs";
import { ApiError } from "../utils/ApiError";
import { saveBase64File } from "../middleware/base64FileUpload";

interface AdminRegisterData {
    admin_name: string;
    admin_email: string;
    admin_password: string;
    profilePic?: string;
    extension?: string;
}

// ADMIN REGISTRATION SERVICE
export const adminRegisterService = async (data: AdminRegisterData) => {
    try {
        const insertData = {
            name: data.admin_name,
            profilePic: "",
            adminEmail: data.admin_email,
            adminPassword: await bcrypt.hash(data.admin_password, 10),
            adminStatus: 0,
            adminCreatedAt: new Date(),
        };

        if (data.profilePic?.trim()) {
            const imagePath = saveBase64File(
                data.profilePic,
                "admin",
                "admin_profile",
                data.extension || ""
            );
            insertData.profilePic = imagePath;
        }

        const result = await dbConfig.execute(
            "INSERT INTO adminUser SET ?",
            [insertData]
        );
        if (!result.insertId) {
            throw new ApiError(400, "Failed to register admin");
        }

        return {
            status: 200,
            message: "Admin registered successfully",
            data: result,
        };
    } catch (error) {
        console.error("Admin registration error:", error);
        throw new ApiError(500, "Internal Server Error");
    }
};

