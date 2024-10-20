import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   // Habilitar CORS
   app.enableCors({
    origin: 'http://localhost:3000', // Cambia esto al dominio desde el que quieres permitir solicitudes
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Permitir cookies y credenciales si es necesario
  });

  const config = new DocumentBuilder()
    .setTitle('Dummy Data API')
    .setDescription('API para consultar datos de usuarios y transacciones con base en DPI y número de tarjeta')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
