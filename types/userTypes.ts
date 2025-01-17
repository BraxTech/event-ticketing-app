import { User } from 'entities/user';
export interface UserRequestBody {
	name: string;
	email: string;
	password: string;
}

export interface UserResponse {
	message: string;
	user?: User; // Assuming User is an entity type
}
