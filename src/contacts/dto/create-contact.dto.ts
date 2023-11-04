import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateContactDto {
  @ApiProperty({ example: 'Anastasia Steele', description: 'Contact name' })
  @IsString()
  @Length(2, 50, { message: 'Must be at least 2 characters long' })
  readonly name: string;

  @ApiProperty({
    example: '761-23-96',
    description: 'Phone number of the contact',
  })
  @IsString()
  readonly phone: string;
}

export class CreateContactResponseDto {
  @ApiProperty({
    example: '654693c70b449af32d7f8613',
    description: 'Backend-generated unique identifier',
  })
  readonly _id: string;

  @ApiProperty({ example: 'Anastasia Steele', description: 'Contact name' })
  readonly name: string;

  @ApiProperty({
    example: '761-23-96',
    description: 'Phone number of the contact',
  })
  readonly phone: string;

  @ApiProperty({ example: 'false', description: 'favorite' })
  readonly favorite: boolean;

  @ApiProperty({ example: '654693c70b449af32d7f8613', description: 'Owner' })
  readonly owner: string;
}
