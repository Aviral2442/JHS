import jwt from "jsonwebtoken";

// Updated interface to be more flexible
interface JwtPayload {
  id?: number;
  adminId?: number;
  name?: string;
  email: string;
  role?: string;
}

const JWT_SECRET = process.env.JWT_SECRET as string;
const SALT_ROUNDS = 10;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET not defined");
}

export const generateToken = (payload: JwtPayload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};