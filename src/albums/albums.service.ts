import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class AlbumsService {
  constructor(private storage: DatabaseService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    return this.storage.create('album', createAlbumDto);
  }

  async findAll() {
    return this.storage.findAll('album');
  }

  async findOne(id: string) {
    return this.storage.findById('album', id);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return this.storage.update('album', id, updateAlbumDto);
  }

  async remove(id: string) {
    return this.storage.delete('album', id);
  }
}
