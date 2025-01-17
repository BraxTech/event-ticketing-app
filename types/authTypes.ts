import type { Request, Response } from 'express';
import { User } from '../entities/user';

export interface AuthRequest extends Request {
	user?: User;
}

export type AuthRequestHandler = (
	req: AuthRequest,
	res: Response
) => Promise<void>;
