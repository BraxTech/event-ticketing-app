import { Router } from 'express';
import {
	createUser,
	getAllUsers,
	getUserById,
	updateUser,
	deleteUser,
} from '../controllers/userController';

const userRouter = Router();

userRouter.post('/users', createUser);
userRouter.get('/users', getAllUsers);
userRouter.get('/users/:id', getUserById);
userRouter.put('/users/:id', updateUser);
userRouter.delete('/users/:id', deleteUser);
export default userRouter;
