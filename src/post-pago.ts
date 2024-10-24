import { ApiProperty } from "@nestjs/swagger";

export class PostPagoDto {
  @ApiProperty({
    description: 'Número de dpi del usuario',
    example: 2882491615033,
  })
  dpi: number;

  @ApiProperty({
    description: 'Monto a pagar',
    example: 1000,
    required: false, // Esto indica que es opcional
  })
  montoPago?: number;
}

export class dpiDto {
  @ApiProperty({
    description: 'Número de dpi del usuario',
    example: 2882491615033,
  })
  dpi: number;
}
