import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, versionKey: false })
export class User {
  @ApiProperty({ example: 'Christian Grey', description: 'Username' })
  @Prop({
    type: String,
    required: true,
    min: 2,
  })
  name: string;

  @ApiProperty({
    example: 'christian.grey@mail.com',
    description: 'E-mail address',
  })
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
    min: 7,
  })
  password: string;

  @Prop({
    type: String,
    default: null,
  })
  token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
