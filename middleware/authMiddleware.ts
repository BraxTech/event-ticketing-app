import type { RequestHandler } from 'express';
import type { AuthRequest } from '../types/authTypes';

export const checkOwnershipOrAdmin: RequestHandler = (
	req: AuthRequest,
	res,
	next
) => {
	const userId = parseInt(req.params.id);
	const isAdmin = req.user?.role === 'admin';
	const isOwnUser = req.user?.id === userId;

	if (!isAdmin && !isOwnUser) {
		res
			.status(403)
			.json({ message: 'Forbidden: Can only access your own profile' });
		return;
	}
	next();
};

export const checkAdmin: RequestHandler = (req: AuthRequest, res, next) => {
	if (req.user?.role !== 'admin') {
		res.status(403).json({ message: 'Forbidden: Admin access required' });
		return;
	}
	next();
};
