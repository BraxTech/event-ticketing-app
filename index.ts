import type { Application, Request, Response } from 'express';
import express from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './AppDataSource';
import userRouter from 'routes/userRoutes';
import authRouter from 'routes/authRoutes';

dotenv.config();

const app: Application = express();
const PORT = 8080;

app.use(express.json());

app.use('/api', userRouter);
app.use('/api', authRouter);

(async () => {
	try {
		await AppDataSource.initialize();
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	} catch (error) {
		console.error('Failed to start the application:', error);
	}
})();
