import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type ContactDocument = HydratedDocument<Contact>;

@Schema()
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
  favorite: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  owner: User;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
