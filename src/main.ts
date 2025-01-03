import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // Importer Swagger

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration de Swagger
  const options = new DocumentBuilder()
    .setTitle('Online Library API')
    .setDescription('API pour la gestion des livres et des utilisateurs')
    .setVersion('1.0')
    .addTag('books')
    .addTag('auth')
    .build();
  
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document); // Route Swagger : /api/docs

  await app.listen(3000);
}
bootstrap();
