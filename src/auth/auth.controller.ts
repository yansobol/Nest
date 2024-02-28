import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('/registration')
	registration(@Body() usertDto: CreateUserDto) {
		return this.authService.registration(usertDto);
	}

	@Post('/login')
	login(@Body() usertDto: CreateUserDto) {
		return this.authService.login(usertDto);
	}
}
