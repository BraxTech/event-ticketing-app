import { AppDataSource } from 'AppDataSource';
import type { RequestHandler } from 'express';
import { User } from 'entities/user';
import { generateJWT, hashPassword, verifyPassword } from 'utils/authUtils';
import { strict } from 'assert';

export const createUser: RequestHandler = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		if (!name || !email || !password) {
			res.status(400).json({ message: 'All fields are required' });
			return;
		}
		const hashedPassword = await hashPassword(password);
		const user = new User();
		user.name = name;
		user.email = email;
		user.password = hashedPassword;

		const savedUser = await AppDataSource.manager.save(user);
		res
			.status(201)
			.json({ message: 'user created successfully', user: savedUser });
	} catch (error) {
		console.error('Error creating user:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

export const loginUser: RequestHandler = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(400).json({ message: 'Email and password are required' });
		return;
	}
	try {
		const user = await AppDataSource.manager.findOne(User, {
			where: { email },
		});
		if (!user) {
			res.status(404).json({ message: 'User not found' });
			return;
		}
		const isPasswordValid = verifyPassword(password, user.password);
		if (!isPasswordValid) {
			res.status(401).json({ message: 'Invalid Credentials' });
			return;
		}
		const token = generateJWT(user.id.toString());
		res.status(200).json({ message: 'Login successful', token });
	} catch (error) {
		console.error('Failed to login:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

export const logoutUser: RequestHandler = async (req, res) => {
	try {
		res.clearCookie('token', {
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
		});
		res.json({ message: 'Logout success!' });
	} catch (error) {
		console.error('Error logging out user: ', error);
		res.status(500).json({ mesage: 'Internal server error' });
	}
};
