import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
// import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from 'src/schemas/contact.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact.name) private readonly contactModel: Model<Contact>,
  ) {}

  async getAll(userId: string): Promise<Contact[]> {
    const contacts = await this.contactModel.find({ owner: userId }).exec();
    return contacts;
  }

  async create(createContactDto: CreateContactDto, userId: string) {
    const contact = await this.contactModel.create({
      ...createContactDto,
      owner: userId,
    });
    return contact;
  }

  async delete(contactId: string) {
    await this.contactModel.findByIdAndRemove({ _id: contactId }).exec();
  }
}
