import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { InMemoryTrackStorage } from './store/track.storage';
import { TracksService } from './tracks.service';

@Module({
  controllers: [TracksController],
  providers: [
    TracksService,
    {
      provide: 'ITrackStorage',
      useClass: InMemoryTrackStorage,
    },
  ],
})
export class TracksModule {}
