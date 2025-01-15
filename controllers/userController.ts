import type { RequestHandler } from 'express';
import { AppDataSource } from '../AppDataSource';
import { User } from '../entities/user';

export const createUser: RequestHandler = async (req, res) => {
	try {
		const { name, email } = req.body;
		if (!name || !email) {
			res.status(400).json({ message: 'All fields are required' });
			return;
		}
		const user = new User();
		user.name = name;
		user.email = email;

		const savedUser = await AppDataSource.manager.save(user);
		res
			.status(201)
			.json({ message: 'user created successfully', user: savedUser });
	} catch (error) {
		console.error('Error creating user:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

export const getAllUsers: RequestHandler = async (req, res) => {
	try {
		const users = await AppDataSource.manager.find(User);
		res.status(200).json(users);
	} catch (error) {
		console.error('Error fetching users:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

export const getUserById: RequestHandler = async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const user = await AppDataSource.manager.findOne(User, {
			where: { id },
		});
		if (!user) {
			res.status(404).json({ message: 'User not found' });
			return;
		}
		res.status(200).json(user);
	} catch (error) {
		console.error('Error fetching user:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

export const updateUser: RequestHandler = async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const { name, email } = req.body;

		const user = await AppDataSource.manager.findOne(User, {
			where: { id },
		});

		if (!user) {
			res.status(404).json({ message: 'User not found' });
			return;
		}

		if (name) user.name = name;
		if (email) user.email = email;

		const updatedUser = await AppDataSource.manager.save(user);
		res
			.status(200)
			.json({ message: 'User updated successfully', user: updatedUser });
	} catch (error) {
		console.error('Error updating user:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

export const deleteUser: RequestHandler = async (req, res) => {
	try {
		const id = parseInt(req.params.id);

		const user = await AppDataSource.manager.findOne(User, {
			where: { id },
		});

		if (!user) {
			res.status(404).json({ message: 'User not found' });
			return;
		}

		await AppDataSource.manager.remove(user);
		res.status(200).json({ message: 'User deleted successfully' });
	} catch (error) {
		console.error('Error deleting user:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};
