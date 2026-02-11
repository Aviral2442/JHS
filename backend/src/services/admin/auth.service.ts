import dbConfig from "../../config/db_Config";
import { ApiError } from "../../utils/ApiError";
import { saveBase64File } from "../../middleware/base64FileUpload";
import { generateToken } from "../../utils/jwt";

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
      adminPassword: data.admin_password,
      adminStatus: 0,
      adminCreatedAt: new Date(),
    };

    if (data.profilePic?.trim()) {
      const imagePath = saveBase64File(
        data.profilePic,
        "admin",
        "admin_profile",
        // data.extension || ""
      );
      insertData.profilePic = imagePath;
    }

    const result = await dbConfig.query(
      `INSERT INTO adminUser SET ?`,
      [insertData]
    );

    return {
      status: 200,
      message: "Admin registered successfully",
      jsonData: {}
    };
  } catch (error) {
    throw new ApiError(500, "Internal Server Error" + error);
  }
};

// ADMIN LOGIN SERVICE
export const adminLoginService = async (
  admin_email: string,
  admin_password: string
) => {
  try {
    // Input validation
    if (!admin_email || !admin_password) {
      throw new ApiError(400, "Email and password are required");
    }

    const [rows]: any = await dbConfig.query(
      `SELECT admin_id, name, adminEmail, adminPassword, profilePic 
       FROM adminUser 
       WHERE adminEmail = ? LIMIT 1`,
      [admin_email]
    );

    if (rows.length === 0) {
      throw new ApiError(401, "Invalid email or password");
    }

    const admin = rows[0];

    if (admin.adminPassword !== admin_password) {
      throw new ApiError(401, "Invalid email or password");
    }

    const payload = {
      adminId: admin.admin_id,
      name: admin.name,
      email: admin.adminEmail,
      role: "admin",
    };

    const token = generateToken(payload);

    return {
      status: 200,
      message: "Login successful",
      data: {
        adminId: admin.admin_id,
        adminName: admin.name,
        adminEmail: admin.adminEmail,
        profilePic: admin.profilePic,
      },
      token,
    };
  } catch (error: any) {
    console.error("Admin login error:", error);

    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(500, "Internal Server Error");
  }
};


