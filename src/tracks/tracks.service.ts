import { Inject, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ITrackStorage } from './interfaces/track-storage.interface';

@Injectable()
export class TracksService {
  constructor(@Inject('ITrackStorage') private storage: ITrackStorage) {}

  create(createTrackDto: CreateTrackDto) {
    return this.storage.create(createTrackDto);
  }

  findAll() {
    return this.storage.findAll();
  }

  findOne(id: string) {
    return this.storage.findById(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.storage.update(id, updateTrackDto);
  }

  remove(id: string) {
    return this.storage.delete(id);
  }
}
