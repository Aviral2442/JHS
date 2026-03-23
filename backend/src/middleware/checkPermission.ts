import { Request, Response, NextFunction } from "express";
import dbConfig from "../config/db_Config";

export const checkPermission = (operationName: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = localStorage.getItem("token")
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const decoded: any = JSON.parse(atob(user.split('.')[1]));
      const roleId = decoded.role_id;

      const [permission]: any = await dbConfig.query(`
        SELECT p.*
        FROM permissions p
        JOIN operations o ON o.id = p.operation_id
        WHERE p.role_id = ? AND o.name = ?
      `, [roleId, operationName]);

      if (!permission.length || !permission[0].can_view) {
        return res.status(403).json({ message: "Access Denied" });
      }

      next();
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
    }
  };
};