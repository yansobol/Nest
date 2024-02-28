import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { UserModel } from './users/users.model';
import { RolesModule } from './roles/roles.module';
import { RolesModel } from './roles/roles.model';
import { UserRolesModel } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.${process.env.NODE_ENV}.env`,
		}),
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: process.env.POSTGRES_HOST,
			port: Number(process.env.POSTGRES_PORT),
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DB,
			models: [UserModel, RolesModel, UserRolesModel],
			autoLoadModels: true,
		}),
		UsersModule,
		RolesModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
