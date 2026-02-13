import jwt from 'jsonwebtoken';
import { JwtPayload } from './createToken';


export const verifyToken = (token: string): JwtPayload => {
    return jwt.verify(token, process.env.JWT_SECRET || 'secret') as JwtPayload;
};