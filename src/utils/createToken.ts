import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export interface JwtPayload {
    userId: string;
    role: string;
}

export const createToken = (payload: JwtPayload) => {
    return jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
};