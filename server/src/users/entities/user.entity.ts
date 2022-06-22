import bcrypt from 'bcrypt';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
	@PrimaryGeneratedColumn('uuid') id: string;
	@Column({
		type: 'varchar',
		nullable: false,
		unique: true,
	})
	username: string;
	@Column({
		type: 'varchar',
		nullable: false,
	})
	password: string;
	@Column({
		type: 'varchar',
		nullable: false,
	})
	email: string;

	@BeforeInsert()
	async hashPassword() {
		this.password = await bcrypt.hash(this.password, 10);
	}
}
