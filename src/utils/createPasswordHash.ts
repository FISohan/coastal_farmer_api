import bcrypt from 'bcrypt';

export const createPasswordHash = (password: string) => {
    return bcrypt.hashSync(password, 10);
};