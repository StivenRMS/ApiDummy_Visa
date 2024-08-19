import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DummyDataService } from './dummy-data.service';
import { GetUserDto } from '../get-user.dto'; // Importa el DTO
import { GetTcDto } from '../get-tc.dto'; // Importa el DTO

@Controller('data')
@ApiTags('data')
export class DummyDataController {
  constructor(private readonly dummyDataService: DummyDataService) {}

  @Post('user-by-dpi')
  @ApiOperation({ summary: 'Obtener datos del usuario por DPI' })
  @ApiResponse({
    status: 200,
    description: 'Datos del usuario obtenidos exitosamente.',
  })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  getUserData(@Body() getUserDto: GetUserDto) {
    const { dpi } = getUserDto;
    const userData = this.dummyDataService.getUserDataByDpi(dpi);
    if (!userData) {
      return { message: 'User not found' };
    }
    return userData;
  }

  @Post('transaction-by-card')
  @ApiOperation({
    summary: 'Obtener datos de la transacción por número de tarjeta',
  })
  @ApiResponse({
    status: 200,
    description: 'Datos de la transacción obtenidos exitosamente.',
  })
  @ApiResponse({ status: 404, description: 'Transacción no encontrada.' })
  getTransactionData(@Body() getTcDto: GetTcDto) {
    // Usa el DTO completo
    const { card_number } = getTcDto;
    const transactionData =
      this.dummyDataService.getTransactionByCardNumber(card_number);
    if (!transactionData) {
      return { message: 'Transaction not found' };
    }
    return transactionData;
  }
}
