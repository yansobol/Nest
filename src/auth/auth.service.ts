import {
	HttpException,
	HttpStatus,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { UserModel } from 'src/users/users.model';

@Injectable()
export class AuthService {
	constructor(
		private userService: UsersService,
		private jwtService: JwtService,
	) {}

	async registration(userDto: CreateUserDto) {
		const candidate = await this.userService.getUserByEmail(userDto.email);
		if (candidate)
			throw new HttpException(
				`User with email: ${userDto.email}, already exists`,
				HttpStatus.BAD_REQUEST,
			);

		const hashPassword = bcrypt.hashSync(userDto.password, 5);
		const user = await this.userService.createUser({
			...userDto,
			password: hashPassword,
		});
		return this.generateToken(user);
	}

	async login(userDto: CreateUserDto) {
		console.log('USER: ', userDto);
		const candidate = await this.validateUser(userDto);
		if (candidate) return this.generateToken(candidate);
	}

	private generateToken(user: UserModel) {
		const payload = { id: user.id, email: user.email, roles: user.roles };
		return {
			token: this.jwtService.sign(payload),
		};
	}

	private async validateUser(userDto: CreateUserDto) {
		const candidate = await this.userService.getUserByEmail(userDto.email);
		if (candidate) {
			const valid = await bcrypt.compare(userDto.password, candidate.password);
			if (valid) return candidate;
		}
		throw new UnauthorizedException({
			message: `User email/password are not valid`,
		});
	}
}
