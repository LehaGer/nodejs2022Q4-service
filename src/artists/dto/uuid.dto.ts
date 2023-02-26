import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UuidDto {
  @IsUUID()
  @ApiProperty({
    format: 'uuid',
    example: '924f2a6c-6595-46ff-ab65-1136d235d465',
  })
  id: string;
}
