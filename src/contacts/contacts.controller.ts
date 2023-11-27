import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import {
  CreateContactDto,
  CreateContactResponseDto,
} from './dto/create-contact.dto';
// import { UpdateContactDto } from './dto/update-contact.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { Contact } from 'src/schemas/contact.schema';

@ApiTags('Contact')
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @ApiOperation({ summary: 'Get all user contacts' })
  @ApiResponse({ status: 200 })
  @Get()
  @UseGuards(AuthGuard)
  async getAll(@Request() req: any): Promise<Contact[]> {
    return await this.contactsService.getAll(req.user.id);
  }

  @ApiOperation({ summary: 'Create a new contact' })
  @ApiResponse({ status: 201, type: CreateContactResponseDto })
  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() createContactDto: CreateContactDto, @Request() req: any) {
    return this.contactsService.create(createContactDto, req.user.id);
  }

  // @UseGuards(AuthGuard)
  // @Delete(':id')
  // async delete(@Param('id') id: string) {
  //   return this.contactsService.delete(id);
  // }
}
