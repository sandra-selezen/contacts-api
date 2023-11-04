import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Christian Grey', description: 'Username' })
  readonly name: string;
  @ApiProperty({
    example: 'christian.grey@mail.com',
    description: 'E-mail address',
  })
  readonly email: string;
  @ApiProperty({ example: '1234567', description: 'Password' })
  readonly password: string;
}
