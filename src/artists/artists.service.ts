import { Inject, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { IArtistStorage } from './interfaces/artist-storage.interface';

@Injectable()
export class ArtistsService {
  constructor(@Inject('IArtistStorage') private storage: IArtistStorage) {}

  create(createArtistDto: CreateArtistDto) {
    return this.storage.create(createArtistDto);
  }

  findAll() {
    return this.storage.findAll();
  }

  findOne(id: string) {
    return this.storage.findById(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.storage.update(id, updateArtistDto);
  }

  remove(id: string) {
    return this.storage.delete(id);
  }
}
