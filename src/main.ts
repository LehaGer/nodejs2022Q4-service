import { HttpAdapterHost, NestFactory } from '@nestjs/core';
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
import { CustomExceptionFilter } from './logging/custom-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(
    new CustomExceptionFilter(
      app.get(HttpAdapterHost),
      app.get(CustomLoggingService),
    ),
  );
  app.useLogger(app.get(CustomLoggingService));

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('REST Service')
    .setDescription('The REST Service API description')
    .setVersion('1.0')
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

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  await app.listen(port || 4000);

  // throw new HttpException('qwe', 402);
}

bootstrap();
