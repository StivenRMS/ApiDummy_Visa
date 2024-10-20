import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DummyDataService {
  private filePath = path.join(__dirname, '../../data/clientes.json');

  // Leer el archivo JSON usando require
  private readData(): any[] {
    return require(this.filePath);
  }

  // Escribir datos al archivo JSON usando fs.writeFileSync
  private writeData(data: any[]) {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
  }

  // Hace un cambio en el JSON de clientes según el número de DPI que se le pase, le cambia el estado de deudor a false
  updateData(dpi: number) {
    const data = this.readData(); // Leer los datos del archivo

    // Buscar el cliente en la lista según el DPI
    const client = data.find((client) => client.dpi === dpi);

    // Si no se encuentra el cliente, lanzar una excepción
    if (!client) {
      throw new NotFoundException('Cliente no encontrado');
    }

    // Actualizar el estado de "esta_al_dia" y otros campos
    client.esta_al_dia = true;
    client.ultima_fecha_pago = new Date().toISOString().split('T')[0]; // Actualiza a la fecha actual
    client.estado_cobro = "Pagado"; // Actualiza el estado del cobro

    // Guardar los cambios en el archivo JSON
    this.writeData(data);

    // Devolver el cliente actualizado
    return client;
  }

  updatePagoParcial(dpi: number, montoPago: number) {
    const data = this.readData(); // Leer los datos del archivo
    const client = data.find((client) => client.dpi === dpi);
    
    if (!client) {
      throw new NotFoundException('Cliente no encontrado');
    }
  
    client.deuda_total = Math.max(0, client.deuda_total - montoPago); // Restar y asegurarse de que no sea negativo
    client.ultima_fecha_pago = new Date().toISOString().split('T')[0]; // Actualizar la última fecha de pago
  
    if (client.deuda_total === 0) {
      client.estado_cobro = 'Pagado';
      client.esta_al_dia = true;
    } else {
      client.estado_cobro = 'Parcialmente Pagado';
      client.esta_al_dia = false;
    }

    this.writeData(data);
    return client;
  }
  
  getData() {
    return this.readData();
  }

  //metodo para obtener los clientes que estan en estado deudor, pagados y todos
  getDeudores() {
    const data = this.readData();
    return data.filter((client) => client.esta_al_dia === false);
  }

  getPagados() {
    const data = this.readData();
    return data.filter((client) => client.esta_al_dia === true);
  }


}
