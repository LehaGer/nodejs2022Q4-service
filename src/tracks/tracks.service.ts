import { Inject, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { IDatabase } from '../database/interfaces/database.interface';

@Injectable()
export class TracksService {
  constructor(@Inject('IDatabase') private storage: IDatabase) {}

  create(createTrackDto: CreateTrackDto) {
    return this.storage.create('track', createTrackDto);
  }

  findAll() {
    return this.storage.findAll('track');
  }

  findOne(id: string) {
    return this.storage.findById('track', id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.storage.update('track', id, updateTrackDto);
  }

  remove(id: string) {
    return this.storage.delete('track', id);
  }
}
