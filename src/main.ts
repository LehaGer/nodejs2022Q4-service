import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { TracksModule } from './tracks/tracks.module';
import { FavoritesModule } from './favorites/favorites.module';
import { CustomLoggingService } from './logging/custom-logging.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const configService = app.get(ConfigService);

  app.useLogger(app.get(CustomLoggingService));

  app.useGlobalPipes(new ValidationPipe());

  const port = configService.get('PORT');

  const config = new DocumentBuilder()
    .setTitle('REST Service')
    .setDescription('The REST Service API description')
    .setVersion('1.0')
    .addServer(`http://localhost:${port}/`)
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();
  const options: SwaggerDocumentOptions = {
    include: [
      UsersModule,
      ArtistsModule,
      AlbumsModule,
      TracksModule,
      FavoritesModule,
    ],
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('doc', app, document);

  await app.listen(port || 4000);
}

bootstrap();
