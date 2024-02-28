import {
	CanActivate,
	ExecutionContext,
	HttpException,
	HttpStatus,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './roles-auth.decorator';
import { UserModel } from 'src/users/users.model';

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(
		private jwtService: JwtService,
		private reflector: Reflector,
	) {}
	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		try {
			const requiredRols = this.reflector.getAllAndOverride<string[]>(
				ROLES_KEY,
				[context.getHandler(), context.getClass()],
			);
			if (!requiredRols) return true;

			const req = context.switchToHttp().getRequest();
			const authHeader = req.headers.authorization;
			const bearer = authHeader.split(' ')[0];
			const token = authHeader.split(' ')[1];
			if (bearer !== 'Bearer' || !token)
				throw new UnauthorizedException({ message: `user not authorized` });

			const user = this.jwtService.decode<UserModel>(token);
			return user.roles.some((role) => requiredRols.includes(role.value));
		} catch (error) {
			throw new HttpException(
				`User not authorized ${error.message}`,
				HttpStatus.FORBIDDEN,
			);
		}
	}
}
