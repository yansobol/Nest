import { ApiProperty } from '@nestjs/swagger';
import {
	BelongsToMany,
	Column,
	DataType,
	Model,
	Table,
} from 'sequelize-typescript';
import { UserModel } from 'src/users/users.model';
import { UserRolesModel } from './user-roles.model';

interface RoleCreationAttrs {
	value: string;
	description: string;
}

@Table({ tableName: 'roles' })
export class RolesModel extends Model<RolesModel, RoleCreationAttrs> {
	@ApiProperty({
		example: '1',
		description: 'Unique id',
	})
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@ApiProperty({
		example: 'Admin',
		description: 'User role',
	})
	@Column({
		type: DataType.STRING,
		unique: true,
		allowNull: false,
	})
	value: string;

	@ApiProperty({
		example: 'Admin manager',
		description: 'Description of the role',
	})
	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	description: string;

	@BelongsToMany(() => UserModel, () => UserRolesModel)
	users: UserModel[];
}
