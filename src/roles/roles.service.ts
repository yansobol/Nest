import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesModel } from './roles.model';
import { UserRolesModel } from './user-roles.model';
import { CreateRoleDto } from './dto/create_role.dto';
import { addRolesToUserDto } from './dto/add_roles_to_user.dto';

@Injectable()
export class RolesService {
	constructor(
		@InjectModel(RolesModel) private roleRepository: typeof RolesModel,
		@InjectModel(UserRolesModel)
		private userRolesRepository: typeof UserRolesModel,
	) {}

	async createRole(dto: CreateRoleDto) {
		const role = await this.roleRepository.create(dto);
		return role;
	}

	async findAllRoles() {
		const roles = await this.roleRepository.findAll();
		return roles;
	}

	async getRoleByValue(value: string) {
		const role = await this.roleRepository.findOne({
			where: { value },
		});
		return role;
	}

	async getRolesByUserId(userId: number) {
		const roles = await this.userRolesRepository.findAll({
			where: { userId },
		});
		return roles;
	}

	async getUsersByRoleId(roleId: number) {
		const users = await this.userRolesRepository.findAll({
			where: { roleId },
		});
		return users;
	}

	async addRolesToUser(userId: number, rolesId: addRolesToUserDto) {
		rolesId.roles.forEach(async (roleId) => {
			await this.userRolesRepository.create({ userId, roleId });
			const roles = await this.userRolesRepository.findAll({
				where: { userId },
			});
			return roles;
		});
	}
}
