import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesModel } from './roles.model';
import { CreateRoleDto } from './dto/create_role.dto';
import { addRolesToUserDto } from './dto/add_roles_to_user.dto';

@ApiTags('User roles')
@Controller('roles')
export class RolesController {
	constructor(private readonly roleService: RolesService) {}

	@ApiOperation({ summary: 'Get all roles' })
	@ApiResponse({ status: 200, type: [RolesModel] })
	@Get()
	getAllRoles() {
		const roles = this.roleService.findAllRoles();
		return roles;
	}

	@ApiOperation({ summary: 'Get role by value' })
	@ApiResponse({ status: 200, type: RolesModel })
	@Get('/role/:value')
	getRoleByValue(@Param('value') value: string) {
		const role = this.roleService.getRoleByValue(value);
		return role;
	}

	@ApiOperation({ summary: 'Get roles by user id' })
	@ApiResponse({ status: 200, type: [RolesModel] })
	@Get('/user/:id')
	getRoleByUserId(@Param('id') id: number) {
		const roles = this.roleService.getRolesByUserId(id);
		return roles;
	}

	@ApiOperation({ summary: 'Create new role' })
	@ApiResponse({ status: 200, type: RolesModel })
	@Post()
	createRole(@Body() dto: CreateRoleDto) {
		const role = this.roleService.createRole(dto);
		return role;
	}
	@ApiOperation({ summary: 'Add one or more roles to user' })
	@ApiParam({ name: 'id', description: 'User id' })
	@ApiResponse({ status: 200, type: [RolesModel] })
	@Post('/user/:id')
	addRolesToUser(@Param('id') id: number, @Body() dto: addRolesToUserDto) {
		const userRoles = this.roleService.addRolesToUser(id, dto);
		return userRoles;
	}
}
