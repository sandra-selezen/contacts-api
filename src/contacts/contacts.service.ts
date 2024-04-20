import { Injectable, NotFoundException } from '@nestjs/common';
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

  async toggleFavorite(contactId: string): Promise<Contact> {
    const contact = await this.contactModel.findById(contactId).exec();

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    contact.favorite = !contact.favorite;
    await contact.save();

    return contact;
  }

  async updateContact(
    contactId: string,
    updateData: { name: string; phone: string },
  ): Promise<Contact> {
    const updatedContact = await this.contactModel
      .findByIdAndUpdate(contactId, { $set: updateData }, { new: true })
      .exec();

    if (!updatedContact) {
      throw new NotFoundException('Contact not found');
    }

    return updatedContact;
  }

  async getFavorites(userId: string): Promise<Contact[]> {
    const favorites = await this.contactModel
      .find({
        owner: userId,
        favorite: true,
      })
      .exec();
    return favorites;
  }

  async delete(contactId: string): Promise<Contact> {
    const deletedContact = await this.contactModel
      .findByIdAndRemove(contactId)
      .exec();
    if (!deletedContact) {
      throw new NotFoundException('Contact not found');
    }
    return null;
  }
}
