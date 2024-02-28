import { ApiProperty } from '@nestjs/swagger';

export class addRolesToUserDto {
  @ApiProperty({
    example: `['admin', 'user']`,
    description: 'Add one or more roles to user',
  })
  readonly roles: number[];
}
