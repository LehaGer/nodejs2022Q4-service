import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { InMemoryStorage } from './stores/in-memory.storage';

@Module({
  providers: [
    DatabaseService,
    {
      provide: 'IDatabase',
      useClass: InMemoryStorage,
    },
  ],
  exports: [DatabaseService],
  imports: [],
})
export class DatabaseModule {}
