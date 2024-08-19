import { ApiProperty } from '@nestjs/swagger';

export class GetUserDto {
  @ApiProperty({
    description: 'Número de DPI del usuario',
    example: 2882491615033,
  })
  dpi: number;
}
