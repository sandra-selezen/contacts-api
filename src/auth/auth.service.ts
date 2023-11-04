import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/schemas/user.schema';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<Partial<User>> {
    const user = await this.getUserByEmail(createUserDto.email);
    if (user) {
      throw new HttpException('Email in use', HttpStatus.CONFLICT);
    }

    const hashPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = await this.userModel.create({
      ...createUserDto,
      password: hashPassword,
    });

    return {
      name: newUser.name,
      email: newUser.email,
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.validateUser(loginUserDto);
    const payload = {
      id: user._id,
    };
    const token = this.jwtService.sign(payload);

    await this.userModel.findByIdAndUpdate(user._id, { token });
    return token;
  }

  async logout(userId: string) {
    await this.userModel.findByIdAndUpdate({ _id: userId }, { token: null });
  }

  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  private async validateUser(loginUserDto: LoginUserDto) {
    const user = await this.getUserByEmail(loginUserDto.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    const passwordCompare = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );

    if (!passwordCompare) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
