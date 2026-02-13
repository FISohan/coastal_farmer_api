import { NextFunction, Request, Response } from "express"
import { AuthRequest } from "./authMiddleware"

export const requiredRole = (...roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        const userRole = req.user.role;
        if (!roles.includes(userRole)) {
            return res.status(403).json({ message: 'Forbidden' })
        }
        next();
    }
}