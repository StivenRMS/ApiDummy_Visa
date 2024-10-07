import { HttpCode,Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DummyDataService } from './dummy-data.service';
import { PostPagoDto } from 'src/post-pago';
import { clientesDto } from 'src/get-clientes';


@Controller('data')
@ApiTags('data')
export class DummyDataController {
  constructor(private readonly dummyDataService: DummyDataService) {}

  @Post('update-pago')
  @ApiOperation({
    summary: 'Pago de credito',
  })
  @ApiResponse({
    status: 200,
    description: 'Datos de la transacción obtenidos exitosamente.',
  })
  @ApiResponse({ status: 404, description: 'Transacción no encontrada.' })
  @HttpCode(200)
  updateData(@Body() data: PostPagoDto) {
    return this.dummyDataService.updateData(data.dpi);
  }

  //endpoint tipo post para obtener datos de personas deudoras con parametro para diferenciar entre pagados y deudores
  @Post('get-clientes')
  @ApiOperation({ summary: 'Datos de clientes' })
  @ApiResponse({
    status: 200,
    description: 'Datos obtenidos exitosamente.',
  })
  @HttpCode(200)
  getClientes(@Body() data: clientesDto) {
    if (data.option === 1) {
      return {
        message: 'Data obtained successfully',
        data: this.dummyDataService.getDeudores(),
      };
    } else if (data.option === 2) {
      return {
        message: 'Data obtained successfully',
        data: this.dummyDataService.getPagados(),
      };
    } else {
      return {
        message: 'Data obtained successfully',
        data: this.dummyDataService.getData(),
      };
    }
    
  }
  
}
