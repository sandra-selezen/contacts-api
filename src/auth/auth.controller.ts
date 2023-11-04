import {
  Controller,
  Post,
  Body,
  UseGuards,
  UsePipes,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto, LoginUserResponseDto } from './dto/login-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@ApiTags('User')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, type: RegisterUserDto })
  @UsePipes(ValidationPipe)
  @Post('register')
  register(@Body() createAuthDto: CreateUserDto) {
    return this.authService.register(createAuthDto);
  }

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, type: LoginUserResponseDto })
  @UsePipes(ValidationPipe)
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @ApiOperation({ summary: 'Log out user' })
  @ApiResponse({ status: 200 })
  @UseGuards(AuthGuard)
  @Post('logout')
  logout(@Request() req: any) {
    return this.authService.logout(req.user.id);
  }
}
