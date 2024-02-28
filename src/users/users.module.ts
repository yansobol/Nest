import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './users.model';
import { RolesModel } from 'src/roles/roles.model';
import { UserRolesModel } from 'src/roles/user-roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    forwardRef(() => AuthModule),
    RolesModule,
    SequelizeModule.forFeature([UserModel, RolesModel, UserRolesModel]),
  ],
  exports: [UsersService],
})
export class UsersModule {}
