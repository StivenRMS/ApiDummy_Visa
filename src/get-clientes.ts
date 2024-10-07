import { ApiProperty } from "@nestjs/swagger";

export class clientesDto {
    @ApiProperty({
        description: 'Clientes deudores o pagados',
        example: 1,
    })
    option: number;
}
