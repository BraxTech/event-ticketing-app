import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

console.log(dotenv);
dotenv.config();
export const AppDataSource = new DataSource({
	type: 'postgres',
	host: process.env.DB_HOST,
	port: 5432,
	url: process.env.DB_URI,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	synchronize: true,
	logging: true,
	entities: [],
	subscribers: [],
	migrations: [],
});
