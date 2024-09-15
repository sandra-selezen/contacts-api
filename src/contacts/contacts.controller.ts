import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Param,
  Delete,
  Patch,
  Put,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import {
  CreateContactDto,
  CreateContactResponseDto,
} from './dto/create-contact.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { Contact } from 'src/schemas/contact.schema';

@ApiTags('Contact')
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @ApiOperation({ summary: 'Get all contacts' })
  @ApiResponse({ status: 200 })
  @Get()
  @UseGuards(AuthGuard)
  async getAll(@Request() req: any): Promise<Contact[]> {
    return this.contactsService.getAll(req.user.id);
  }

  @ApiOperation({ summary: 'Create a new contact' })
  @ApiResponse({ status: 201, type: CreateContactResponseDto })
  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() createContactDto: CreateContactDto, @Request() req: any) {
    return this.contactsService.create(createContactDto, req.user.id);
  }

  @ApiOperation({ summary: 'Toggle contact favorite status' })
  @ApiResponse({ status: 200, description: 'Favorite status toggled' })
  @UseGuards(AuthGuard)
  @Patch(':id/favorite')
  async toggleFavorite(@Param('id') id: string) {
    return this.contactsService.toggleFavorite(id);
  }

  @ApiOperation({ summary: 'Update a contact' })
  @ApiResponse({ status: 200, description: 'Contact updated' })
  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateData: { name: string; phone: string },
  ) {
    return this.contactsService.updateContact(id, updateData);
  }

  @ApiOperation({ summary: 'Get favorite contacts' })
  @ApiResponse({ status: 200, type: Contact, isArray: true })
  @Get('favorites')
  @UseGuards(AuthGuard)
  async getFavorites(@Request() req: any): Promise<Contact[]> {
    return this.contactsService.getFavorites(req.user.id);
  }

  @ApiOperation({ summary: 'Delete a contact' })
  @ApiResponse({ status: 200, description: 'Contact deleted' })
  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.contactsService.delete(id);
  }
}
