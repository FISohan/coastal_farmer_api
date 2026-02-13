import { Request, Response } from 'express';
import { Admin } from '../models/adminModel';
import { verifyPassword } from '../utils/verifyPassword';
import { createToken } from '../utils/createToken';

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isPasswordValid = verifyPassword(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = createToken({ userId: admin._id.toString(), role: admin.role });
        res.json({ message: 'Login successful', token });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};