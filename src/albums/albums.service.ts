import { Inject, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { IDatabase } from '../database/interfaces/database.interface';

@Injectable()
export class AlbumsService {
  constructor(@Inject('IDatabase') private storage: IDatabase) {}

  create(createAlbumDto: CreateAlbumDto) {
    return this.storage.create('album', createAlbumDto);
  }

  findAll() {
    return this.storage.findAll('album');
  }

  findOne(id: string) {
    return this.storage.findById('album', id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return this.storage.update('album', id, updateAlbumDto);
  }

  remove(id: string) {
    return this.storage.delete('album', id);
  }
}
