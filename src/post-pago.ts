import { ApiProperty } from "@nestjs/swagger";

export class PostPagoDto {
    @ApiProperty({
        description: 'Número de dpi del usuario',
        example: 2882491615033,
    })
    dpi: number;
}
