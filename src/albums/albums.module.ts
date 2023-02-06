import { Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { InMemoryAlbumStorage } from './store/album.storage';
import { AlbumsService } from './albums.service';

@Module({
  controllers: [AlbumsController],
  providers: [
    AlbumsService,
    {
      provide: 'IAlbumStorage',
      useClass: InMemoryAlbumStorage,
    },
  ],
})
export class AlbumsModule {}
