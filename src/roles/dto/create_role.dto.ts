import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
	@ApiProperty({
		example: 'admin',
		description: 'User role',
	})
	readonly value: string;

	@ApiProperty({
		example: 'Admin',
		description: 'Description of user role',
	})
	readonly description: string;
}
