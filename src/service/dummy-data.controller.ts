import { HttpCode,Controller, Post, Body, Get , Query, NotFoundException} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DummyDataService } from './dummy-data.service';
import { PostPagoDto, dpiDto } from 'src/post-pago';
import { clientesDto } from 'src/get-clientes';
import { stat } from 'fs';


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

  @Post('update-pago-parcial')
  @ApiOperation({
    summary: 'Pago parcial de credito',
  })
  @ApiResponse({
    status: 200,
    description: 'Datos de la transacción obtenidos exitosamente.',
  })
  @ApiResponse({ status: 404, description: 'Transacción no encontrada.' })
  @HttpCode(200)
  updatePagoParcial(@Body() data: PostPagoDto) {
    return this.dummyDataService.updatePagoParcial(data.dpi, data.montoPago);
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

@Get('get-cliente')
@ApiOperation({ summary: 'Datos de un cliente' })
@ApiResponse({
  status: 200,
  description: 'Datos obtenidos exitosamente.',
})
@ApiResponse({ status: 404, description: 'Cliente no encontrado.' })
async getCliente(@Query() data: dpiDto) {
  const client = this.dummyDataService.getCliente(data.dpi);
  if (!client) {
    throw new NotFoundException('Cliente no encontrado');
  }
  return client;
}
  
}
