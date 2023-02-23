import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ArtistsService {
  constructor(private storage: DatabaseService) {}

  async create(createArtistDto: CreateArtistDto) {
    return this.storage.create('artist', createArtistDto);
  }

  async findAll() {
    return this.storage.findAll('artist');
  }

  async findOne(id: string) {
    return this.storage.findById('artist', id);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.storage.update('artist', id, updateArtistDto);
  }

  async remove(id: string) {
    return this.storage.delete('artist', id);
  }
}
