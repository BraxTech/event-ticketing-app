import type { Application, Request, Response } from 'express';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
import { AppDataSource } from './AppDataSource';

const app: Application = express();
const PORT = 8080;
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
