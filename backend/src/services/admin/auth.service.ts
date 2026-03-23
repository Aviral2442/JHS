import dbConfig from "../../config/db_Config";
import { ApiError } from "../../utils/ApiError";
import { saveBase64File } from "../../middleware/base64FileUpload";
import { generateToken } from "../../utils/jwt";

interface AdminRegisterData {
  admin_name: string;
  admin_email: string;
  admin_password: string;
  admin_profile?: string;
  extension?: string;
}

// ADMIN REGISTRATION SERVICE
export const adminRegisterService = async (data: AdminRegisterData) => {
  try {
    const insertData = {
      admin_name: data.admin_name,
      admin_profile: "",
      admin_email: data.admin_email,
      admin_password: data.admin_password,
      admin_status: 0,
      admin_createdAt: new Date(),
    };

    if (data.admin_profile?.trim()) {
      const imagePath = saveBase64File(
        data.admin_profile,
        "admin",
        "admin_profile",
        // data.extension || ""
      );
      insertData.admin_profile = imagePath;
    }

    const result = await dbConfig.query(
      `INSERT INTO admin SET ?`,
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
      `SELECT admin_id, admin_name, admin_email, admin_password, admin_profile, role_id
       FROM admin 
       WHERE admin_email = ? LIMIT 1`,
      [admin_email]
    );

    if (rows.length === 0) {
      throw new ApiError(401, "Invalid email or password");
    }

    const admin = rows[0];

    if (admin.admin_password !== admin_password) {
      throw new ApiError(401, "Invalid email or password");
    }

    const payload = {
      adminId: admin.admin_id,
      name: admin.admin_name,
      email: admin.admin_email,
      roleId: admin.role_id
    };

    const token = generateToken(payload);

    return {
      status: 200,
      message: "Login successful",
      data: {
        adminId: admin.admin_id,
        adminName: admin.admin_name,
        adminEmail: admin.admin_email,
        profilePic: admin.admin_profile,
        roleId: admin.role_id,
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


