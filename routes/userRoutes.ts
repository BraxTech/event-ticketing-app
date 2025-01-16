import { Router } from 'express';
import {
	getAllUsers,
	getUserById,
	updateUser,
	deleteUser,
} from '../controllers/userController';

const userRouter = Router();

userRouter.get('/users', getAllUsers);
userRouter.get('/users/:id', getUserById);
userRouter.put('/users/:id', updateUser);
userRouter.delete('/users/:id', deleteUser);
export default userRouter;
