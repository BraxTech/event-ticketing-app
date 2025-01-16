import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	name!: string;

	@Column({ unique: true })
	email!: string;

	@Column({ type: 'json', nullable: true })
	favoriteEvents?: number[]; // List of favorited event IDs

	@Column()
	password!: string;

	// @OneToMany(()=>Ticket,(ticket)=> ticket.user)
}
