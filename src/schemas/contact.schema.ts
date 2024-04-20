import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';

export type ContactDocument = HydratedDocument<Contact>;

@Schema({ timestamps: true, versionKey: false })
export class Contact {
  @Prop({
    type: String,
    required: [true, 'Name is required'],
  })
  name: string;

  @Prop({
    type: String,
    required: [true, 'Phone number is required'],
  })
  phone: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  favorite: boolean;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  owner: User;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
