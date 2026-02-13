import { Response, Request, NextFunction } from "express";
import { verifyToken } from "../utils/verifyToken";

export interface AuthRequest extends Request {
    user?: {
        userId: string;
        role: string;
    };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decodedToken = verifyToken(token);
        req.user = decodedToken;
        console.log(req.user);
        next();
    } catch (error: any) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};