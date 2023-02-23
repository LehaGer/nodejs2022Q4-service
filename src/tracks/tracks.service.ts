import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class TracksService {
  constructor(private storage: DatabaseService) {}

  async create(createTrackDto: CreateTrackDto) {
    return this.storage.create('track', createTrackDto);
  }

  async findAll() {
    return this.storage.findAll('track');
  }

  async findOne(id: string) {
    return this.storage.findById('track', id);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.storage.update('track', id, updateTrackDto);
  }

  async remove(id: string) {
    return this.storage.delete('track', id);
  }
}
