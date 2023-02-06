import { Inject, Injectable } from '@nestjs/common';
import { IAlbumStorage } from './interfaces/album-storage.interface';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumsService {
  constructor(@Inject('IAlbumStorage') private storage: IAlbumStorage) {}

  create(createAlbumDto: CreateAlbumDto) {
    return this.storage.create(createAlbumDto);
  }

  findAll() {
    return this.storage.findAll();
  }

  findOne(id: string) {
    return this.storage.findById(id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return this.storage.update(id, updateAlbumDto);
  }

  remove(id: string) {
    return this.storage.delete(id);
  }
}
