import { Admin } from "../models/adminModel";
import { createPasswordHash } from "./createPasswordHash";

export const createInitAdmin = async () => {
    const admin = new Admin({
        name: 'Sohan',
        email: 'fisohan7@gmail.com',
        password: createPasswordHash('admin'),
        role: 'admin',
    });
    await admin.save();
};