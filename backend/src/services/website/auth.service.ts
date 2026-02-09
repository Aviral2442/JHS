import dbConfig from "../../config/db_Config";
import { ApiError } from "../../utils/ApiError";
import { generateToken } from "../../utils/jwt";
import { currentUnixTimeStamp } from "../../utils/CurrentUnixTimeStamp";

// CONSUMER REGISTRATION SERVICE
export const UserRegisterService = async (data: any) => {
    try {
        const insertData = {
            users_name: data.users_name,
            users_email: data.users_email,
            users_password: data.users_password,
            cosnumer_reg_source: "Website",
            users_status: 0,
            created_at: currentUnixTimeStamp(),
        }

        const result = await dbConfig.query(
            `INSERT INTO consumer_user SET ?`,
            [insertData]
        );

        return {
            status: 200,
            message: "User registered successfully",
        };
    } catch (error) {
        console.error("User registration error:", error);
        throw new ApiError(500, "Internal Server Error");
    }
};

// CONSUMER LOGIN SERVICE
export const UserLoginService = async (data: any) => {
  try {
    const { users_email, users_password } = data;

    // Input validation
    if (!users_email || !users_password) {
      throw new ApiError(400, "Email and password are required");
    }

    const [rows]: any = await dbConfig.query(
      `SELECT consumerusers_id, users_name, users_email, users_password 
       FROM consumer_user 
       WHERE users_email = ? LIMIT 1`,
      [users_email]
    );

    if (rows.length === 0) {
      throw new ApiError(401, "Invalid email or password");
    }

    const user = rows[0];

    // Use bcrypt to compare passwords

    if (user.users_password !== users_password) {
      throw new ApiError(401, "Invalid email or password");
    }

    const token = generateToken({
      id: user.consumerusers_id,
      name: user.users_name,
      email: user.users_email,
    });

    return {
      status: 200,
      message: "User logged in successfully",
      jsonData: {
        token,
        user: {
          id: user.consumerusers_id,
          name: user.users_name,
          email: user.users_email,
        },
      },
    };
  } catch (error) {
    console.error("User login error:", error);
    throw error;
  }
};