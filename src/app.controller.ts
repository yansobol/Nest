import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Say Hello 👋')
@Controller('/api')
export class AppController {
	constructor(private readonly appService: AppService) {}

	@ApiOperation({ summary: 'Say hello function' })
	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	@ApiOperation({ summary: 'Say hello to specific user' })
	@Get('/:id')
	getHelloId(@Param('id') id: string): string {
		return `Hello ${id}`;
	}
}
