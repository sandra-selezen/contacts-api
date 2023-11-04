import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({ example: 'Christian Grey', description: 'Username' })
  readonly name: string;
  @ApiProperty({
    example: 'christian.grey@mail.com',
    description: 'E-mail address',
  })
  readonly email: string;
}
