import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import dbConfig from "../config/db_Config";

// ADMIN REGISTRATION CONTROLLER
export const adminRegister = async (req: Request, res: Response) => {
    try {
        const { adminName, adminEmail, adminPassword } = req.body;

        if (!adminName || !adminEmail || !adminPassword) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        await dbConfig.query(
            'INSERT INTO admins (adminName, adminEmail, adminPassword) VALUES (?, ?, ?)',
            [adminName, adminEmail, hashedPassword]
        );

        res.status(200).json({ message: 'Admin registered successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};