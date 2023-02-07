import { Injectable } from '@nestjs/common';
import { AlbumEntity } from '../entities/album.entity';
import { IAlbumStorage } from '../interfaces/album-storage.interface';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class InMemoryAlbumStorage implements IAlbumStorage {
  private albums: AlbumEntity[] = [];

  create(params: CreateAlbumDto): AlbumEntity {
    const newAlbum: AlbumEntity = {
      id: uuid(),
      ...params,
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  delete(id: string): void {
    this.albums = this.albums.filter((album) => album.id !== id);
  }

  findById(id: string): AlbumEntity | undefined {
    return this.albums.find((album) => album.id === id);
  }

  findAll(): AlbumEntity[] {
    return this.albums;
  }

  update(id: string, params: UpdateAlbumDto): AlbumEntity {
    const albumEntityIndex = this.albums.findIndex((album) => album.id === id);
    this.albums[albumEntityIndex] = {
      ...this.albums[albumEntityIndex],
      ...params,
    };
    return this.albums[albumEntityIndex];
  }
}
