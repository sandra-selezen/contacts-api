import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Christian Grey', description: 'Username' })
  @IsString()
  @Length(2, 50, { message: 'Must be at least 2 characters long' })
  readonly name: string;

  @ApiProperty({
    example: 'christian.grey@mail.com',
    description: 'E-mail address',
  })
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '1234567', description: 'Password' })
  @IsString()
  @Length(7, 100, { message: 'Must be at least 7 characters long' })
  readonly password: string;
}
