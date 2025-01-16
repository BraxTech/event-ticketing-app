import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
console.log(JWT_SECRET);
if (!JWT_SECRET) {
	throw new Error('NO JWT secret');
}

export const hashPassword = async (password: string) => {
	const salt = await bcrypt.genSalt(10);
	return bcrypt.hash(password, salt);
};

export const verifyPassword = async (
	enteredPassword: string,
	storedPassword: string
) => {
	return bcrypt.compare(enteredPassword, storedPassword);
};

export const generateJWT = (userId: string) => {
	const payload = { userId };
	const options = { expiresIn: '1h' };
	return jwt.sign(payload, JWT_SECRET, options);
};
