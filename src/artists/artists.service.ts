import { Inject, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { IDatabase } from '../database/interfaces/database.interface';

@Injectable()
export class ArtistsService {
  constructor(@Inject('IDatabase') private storage: IDatabase) {}

  create(createArtistDto: CreateArtistDto) {
    return this.storage.create('artist', createArtistDto);
  }

  findAll() {
    return this.storage.findAll('artist');
  }

  findOne(id: string) {
    return this.storage.findById('artist', id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.storage.update('artist', id, updateArtistDto);
  }

  remove(id: string) {
    return this.storage.delete('artist', id);
  }
}
