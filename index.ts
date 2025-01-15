import type { Application, Request, Response } from 'express';
import express from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './AppDataSource';
import { request } from 'http';
import userRouter from 'routes/userRoutes';

dotenv.config();

const app: Application = express();
const PORT = 8080;

interface Params {
	id: string;
}

app.use(express.json());

app.use('/api', userRouter);

app.get('/api/events', (req: Request, res: Response) => {
	res.send('Welcome to the server');
});

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
