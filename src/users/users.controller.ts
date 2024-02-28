import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserModel } from './users.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RoleGuard } from 'src/auth/role.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@ApiOperation({ summary: 'Get all users' })
	@ApiResponse({ status: 200, type: [UserModel] })
	@Roles('admin')
	@UseGuards(JwtAuthGuard)
	@UseGuards(RoleGuard)
	@Get()
	getAll() {
		return this.usersService.getAllUsers();
	}

	@ApiOperation({ summary: 'Create new user' })
	@ApiResponse({ status: 200, type: UserModel })
	@Post()
	createUser(@Body() userDto: CreateUserDto) {
		return this.usersService.createUser(userDto);
	}
}
