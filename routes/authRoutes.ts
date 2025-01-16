import { Router } from 'express';
import { createUser, loginUser, logoutUser } from 'controllers/authCotroller';

const authRouter = Router();
authRouter.post('/register', createUser);
authRouter.post('/login', loginUser);
authRouter.post('/logout', logoutUser);
export default authRouter;
