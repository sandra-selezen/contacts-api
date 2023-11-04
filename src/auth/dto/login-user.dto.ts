import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class LoginUserDto {
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

export class LoginUserResponseDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    description: 'JWT token',
  })
  readonly token: string;
}
