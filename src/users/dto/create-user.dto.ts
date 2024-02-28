import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
	@ApiProperty({
		example: 'example@email.com',
		description: 'Unique email adress',
	})
	readonly email: string;

	@ApiProperty({
		example: '******',
		description: 'Password',
	})
	readonly password: string;
}
