import type { Request, Response, RequestHandler } from 'express';
import { AppDataSource } from '../AppDataSource';
import { User } from '../entities/user';
import { hashPassword } from 'utils/authUtils';
import type { AuthRequestHandler } from 'types/authTypes';

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

export const updateUser: AuthRequestHandler = async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const { name, email, password, role } = req.body;

		const user = await AppDataSource.manager.findOne(User, {
			where: { id },
		});

		if (!user) {
			res.status(404).json({ message: 'User not found' });
			return;
		}

		// Check if user has permission to update
		const isAdmin = req.user?.role === 'admin';
		const isOwnUser = req.user?.id === user.id;

		if (!isAdmin && !isOwnUser) {
			res
				.status(403)
				.json({ message: 'Forbidden: Can only update your own profile' });
			return;
		}

		// Only admin can update roles
		if (role && !isAdmin) {
			res
				.status(403)
				.json({ message: 'Forbidden: Only admins can update roles' });
			return;
		}

		// Only allow password updates for own user or admin
		if (password && !isOwnUser && !isAdmin) {
			res
				.status(403)
				.json({ message: 'Forbidden: Can only update your own password' });
			return;
		}

		// Update fields
		if (password) user.password = await hashPassword(password);
		if (name) user.name = name;
		if (email) user.email = email;
		if (role && isAdmin) user.role = role;

		const updatedUser = await AppDataSource.manager.save(user);
		res.status(200).json({
			message: 'User updated successfully',
			user: updatedUser,
		});
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
